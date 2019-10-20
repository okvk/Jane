# Jane 开发文档

## 分支管理
- `master`: 生产环境分支
  - 由 `develop` 分支定期发起 `Pull Request` 并入
  - 合并 `Pull Request` 时选择 `Create a merge commit`
  - 合并 `develop` 后 `git rebase master develop`
- `develop`: 测试环境分支
  - 由 `feature/...`，`bugfix/...` 等临时分支发起 `Pull Request` 并入
  - 合并 `Pull Request` 时根据分支 commit 数量选择合并方式

## 开发文档
- [前端文档](frontend.md)
- [后端文档](backend.md)
- [部署文档](deployment.md)
