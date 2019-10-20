from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.utils.six import BytesIO
from django.urls import reverse
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth import get_user_model
from resources.models import Resource
from resources.views import ResourceList


def create_image(
    storage, filename, size=(100, 100), image_mode="RGB", image_format="PNG"
):
    """
    Generate a test image, returning the filename that it was saved as.
    If ``storage`` is ``None``, the BytesIO containing the image data
    will be passed instead.
    """
    data = BytesIO()
    Image.new(image_mode, size).save(data, image_format)
    data.seek(0)
    if not storage:
        return data
    image_file = ContentFile(data.read())
    return storage.save(filename, image_file)


class ResourceTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="test", password="password", is_active=True
        )
        self.factory = APIRequestFactory()

    def construct_request(self, form_data):
        request = self.factory.post(
            reverse("resources:resource-list-new"), form_data
        )
        force_authenticate(request, user=self.user)
        return request

    # deleting the user will remove the user, and resource CASCADE including file in the disk
    def tearDown(self):
        self.user.delete()

    def test_adding_an_image_resource(self):
        # set up form data
        filename = "test.png"
        file_item = create_image(None, filename)
        form_data = {
            "filename": filename,
            "filetype": "IMAGE",
            "upload": file_item,
        }
        response = ResourceList.as_view()(self.construct_request(form_data))
        res_filename = response.data["data"].get("filename")
        self.assertEquals(response.status_code, 201)
        self.assertEqual(res_filename, filename)

    def test_uploading_file_resource(self):
        filename = "test.txt"
        file_item = SimpleUploadedFile(filename, b"this is some text inside")
        form_data = {
            "filename": filename,
            "filetype": "ATTACHMENT",
            "upload": file_item,
        }
        response = ResourceList.as_view()(self.construct_request(form_data))
        res_filename = response.data["data"].get("filename")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(res_filename, filename)

    def test_adding_an_invalid_image_resource(self):
        # set up form data
        filename = "test.png"
        file_item = SimpleUploadedFile(
            filename, b"this is some text - not an image"
        )
        form_data = {
            "filename": filename,
            "filetype": "IMAGE",
            "upload": file_item,
        }
        response = ResourceList.as_view()(self.construct_request(form_data))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error_code"], 4001)
        self.assertEqual(
            response.data["errors"]["non_field_errors"], ["Invalid Image File"]
        )
