# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - link "QA Playground" [ref=e4] [cursor=pointer]:
      - /url: /
      - heading "QA Playground" [level=1] [ref=e5]
    - link "full courses" [ref=e7] [cursor=pointer]:
      - /url: /#apps
      - img [ref=e8]
      - text: Apps
    - link "Playwright logo View Test Suite" [ref=e19] [cursor=pointer]:
      - /url: https://github.com/marko-simic/qa-playground-tests/blob/main/tests/verify-account.spec.js
      - img "Playwright logo" [ref=e21]
      - generic [ref=e22]: View Test Suite
  - main [ref=e23]:
    - generic [ref=e24]:
      - heading "Verify Your Account" [level=2] [ref=e25]
      - paragraph [ref=e26]:
        - text: We emailed you the six digit code to cool_guy@email.com
        - text: Enter the code below to confirm your email address.
      - generic [ref=e27]:
        - spinbutton [active] [ref=e28]: "9"
        - spinbutton [ref=e29]: "9"
        - spinbutton [ref=e30]: "9"
        - spinbutton [ref=e31]: "9"
        - spinbutton [ref=e32]: "9"
        - spinbutton [ref=e33]: "9"
      - generic [ref=e34]: The confirmation code is 9-9-9-9-9-9
  - contentinfo [ref=e35]:
    - generic [ref=e36]:
      - text: All the credit for this mini-app goes to
      - link "Brad Traversy" [ref=e37] [cursor=pointer]:
        - /url: https://github.com/bradtraversy
```