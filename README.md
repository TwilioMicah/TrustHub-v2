

### Twilio Profile Management Tool

### Functionality of Each Tool

#### Phone Number(s) and Their Linked Profiles
A bundle type must be selected from the options under the header **"Select Bundle Types to Check"**. If no other filters are specified, this tool will display all numbers connected to **Business + Trust Hub** bundles under the parent account and its subaccounts.

Other filter options are available under the **"Filter Options"** checkbox. If selected, an **Account SID** must be specified at the very least. Additional filter options can be applied if desired.

#### Assign Number(s) to Profile(s)
All required information must be entered to assign a number to a bundle. This tool allows assigning multiple numbers to multiple bundles simultaneously. A number must first be assigned to a **Business Profile** before it can be assigned to a **Trust Hub Profile**. Ensure the order of the inputs reflects this requirement.

#### Remove Number(s) from Profile(s)
All required information must be entered to remove a number from a bundle. Multiple numbers can be removed from multiple bundles at the same time.

#### Display All Profiles Under an Account
The **Account SID** input is optional. If an **Account SID** is specified, the tool will display profiles only under that account. If no **Account SID** is entered, it will display all profiles under the **parent account and its subaccounts**.

### General Info
* Ensure you choose how you want to receive the data output (**download** or **display**).
* The tools **"Phone Number(s) and Their Linked Profiles"** and **"Display All Profiles Under Account"** do not modify your account. These tools only read and output existing profiles.
* Because this tool is accessed via a **publicly accessible URL** that automatically uses your **Account SID** and **auth_token**, access should be limited by setting a password in your Twilio Function:
   1. Open the Function.
   2. Click on **"Environment Variables"** in the bottom left corner.
   3. Change the value of **Password**.
   4. Click **"Deploy All"** in the bottom left corner.
