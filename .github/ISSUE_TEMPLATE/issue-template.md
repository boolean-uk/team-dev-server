---
name: Issue Template
about: Describe this issue template's purpose here.
title: Task Desciption Here
labels: ''
assignees: ''

---

## User Story
[If applicable, add a link to the user story for this task here, if not feel free to delete this section]

## Tasks
[Add your technical tasks here]

## Check List
**Before PR**
[ ] Have tested locally using ThunderClient/Postman/etc.
[ ] For any new APIs, have documented in the README.md
[ ] Have included and tested any required schema changes
[ ] Have handled all error cases (try/catch, checked user input, etc.)
[ ] Error messages are consistent with the rest of the code
[ ] Correct HTTP Response codes and verbs are used 
[ ] Code confirms to the existing style and structure
[ ] No warnings or errors are reported when using the API
[ ] If modifying an existing API the client app  already uses, have verified locally the client app still works as expected with changes
[ ] If adding a new API, any developers working on the client have reviewed the request params and expected responses

**After PR Merge**
[ ] Have verified the API works on the deployed build using ThunderClient/Postman/etc.
[ ] Have verified any required schema updates have been applied cleanly
[ ] If modifying an existing API the client app already uses, have verified the deployed client app still works as expected
