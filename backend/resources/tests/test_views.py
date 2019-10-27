import errno
import os
import uuid
from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.utils.six import BytesIO
from django.urls import reverse
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth import get_user_model

from resources.models import Resource
from resources.views import ResourceList, ResourceInstance
from utils import errors


def create_image(
    filename,
    size=(100, 100),
    image_mode="RGB",
    image_format="PNG",
    path="temp/",
):
    """
    Generate a test image
    """
    if not os.path.exists(path):
        try:
            os.makedirs(path)
        except OSError as exc:  # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    Image.new(image_mode, size).save(path + filename, image_format)
    image_file = ContentFile(open(path + filename, "rb").read(), name=filename)
    return image_file


class ResourceTests(TestCase):
    def setUp(self):
        self.user_a = get_user_model().objects.create(
            username="test_a",
            password="password",
            email="user_a@g.com",
            is_active=True,
        )
        self.user_b = get_user_model().objects.create(
            username="test_b",
            password="password",
            email="user_b@g.com",
            is_active=True,
        )
        self.factory = APIRequestFactory()

    # deleting the user will remove the user, and resource CASCADE including file in the disk
    def tearDown(self):
        self.user_a.delete()
        self.user_b.delete()

    def create_resource_instance(
        self, filename="test.png", filetype="IMAGE", file_item=None, user=None
    ):
        if not file_item:
            if filetype == "IMAGE":
                file_item = create_image(filename)
            else:
                file_item = SimpleUploadedFile(
                    filename, b"this is some text inside"
                )
        form_data = {"filetype": filetype, "upload": file_item}
        request = self.factory.post(
            reverse("resources:resource-list-new"), form_data
        )
        force_authenticate(request, user=user or self.user_a)
        response = ResourceList.as_view()(request)
        return response

    def test_adding_an_image_resource(self):
        response = self.create_resource_instance()
        res_filename = response.data["data"].get("filename")
        self.assertEquals(response.status_code, 201)
        self.assertEqual("test.png", res_filename)

    def test_uploading_file_resource(self):
        filename = "test.txt"
        response = self.create_resource_instance(
            filename=filename, filetype="ATTACHMENT"
        )
        res_filename = response.data["data"].get("filename")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(res_filename, filename)

    def test_adding_an_invalid_image_resource(self):
        # set up form data
        filename = "invalid.png"
        file_item = SimpleUploadedFile(
            filename, b"this is some text - not an image"
        )
        response = self.create_resource_instance(
            filename=filename, file_item=file_item
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error_code"], 4001)
        self.assertEqual(
            response.data["errors"][errors.MSG], ["Invalid Image File"]
        )

    def test_query_resource_list(self):
        filename_a = "test1.txt"
        filename_b = "test2.txt"
        # By default create_resource_instance use self.user_a
        self.create_resource_instance(
            filename=filename_a, filetype="ATTACHMENT"
        )
        self.create_resource_instance(
            filename=filename_b, filetype="ATTACHMENT"
        )

        request = self.factory.get(reverse("resources:resource-list-new"))
        force_authenticate(request, user=self.user_a)
        response = ResourceList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 2)
        self.assertIn(
            filename_a, [item["filename"] for item in response.data["data"]]
        )
        self.assertIn(
            filename_b, [item["filename"] for item in response.data["data"]]
        )

    def test_resource_list_distinguish_different_user(self):
        filename_a = "test1.txt"
        filename_b = "test2.txt"
        # Create two resource own by user_a and user_a respectively
        self.create_resource_instance(
            filename=filename_a, filetype="ATTACHMENT", user=self.user_a
        )
        self.create_resource_instance(
            filename=filename_b, filetype="ATTACHMENT", user=self.user_b
        )
        # user_a query for resources list should return only one record.
        request = self.factory.get(reverse("resources:resource-list-new"))
        force_authenticate(request, user=self.user_a)
        response = ResourceList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 1)
        self.assertIn(
            filename_a, [item["filename"] for item in response.data["data"]]
        )
        self.assertNotIn(
            filename_b, [item["filename"] for item in response.data["data"]]
        )

    def test_can_get_resource_instance_with_auth(self):
        response = self.create_resource_instance()
        uid = response.data["data"]["id"]
        request = self.factory.get(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        force_authenticate(request, user=self.user_a)
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 200)

    def test_can_get_resource_instance_without_auth(self):
        response = self.create_resource_instance()
        uid = response.data["data"]["id"]
        request = self.factory.get(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 200)

    def test_get_resource_instance_404_when_resource_not_exist(self):
        uid = uuid.uuid4()
        request = self.factory.get(
            reverse("resources:resource-detail", args=[uid])
        )
        request = self.factory.get(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        force_authenticate(request, user=self.user_a)
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 404)

    def test_delete_instance_with_auth(self):
        response = self.create_resource_instance()
        uid = response.data["data"]["id"]
        request = self.factory.delete(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        force_authenticate(request, user=self.user_a)
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 204)

        # After resource being deleted,  the request should return 404
        request = self.factory.get(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 404)

    def test_cannot_delete_instance_without_auth(self):
        response = self.create_resource_instance()
        uid = response.data["data"]["id"]
        request = self.factory.delete(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 401)

        # The request should return 200 since it's not deleted
        request = self.factory.get(
            reverse("resources:resource-detail", kwargs={"pk": uid})
        )
        response = ResourceInstance.as_view()(request, pk=uid)
        self.assertEqual(response.status_code, 200)
