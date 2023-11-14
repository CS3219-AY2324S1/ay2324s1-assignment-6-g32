[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UxpU_KWG)

# Software Requirements

Download and install these software if you do not have them locally.

   - [AWS CLI](https://aws.amazon.com/cli/)

# Setup

1. Install the Serverless Framework Globally (if not already installed):
   `npm install -g serverless`

2. Install Dependencies
   `npm install`

3. Configure AWS Credentials
   `aws configure`

   - [Learn how to get your AWS credential keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user_manage_add-key.html)

4. Deploy the Services on your AWS
   `serverless deploy`

5. Check Deployment Status by going to your [AWS Lambda console](https://ap-southeast-1.console.aws.amazon.com/lambda/home?region=ap-southeast-1#/functions)
   - If you cannot find the function, change your AWS location to Singapore on the top right hand corner

6. The function will run everyday at 12am automatically. But if you wish to populate the questions manually: Click on Test (1) > Enter any event name (2) > Click the Test button (3)

![a-6ss](https://github.com/CS3219-AY2324S1/ay2324s1-assignment-6-g32/assets/63772723/3064aaf7-3c54-4e9f-a5a0-48a80dfcd277)

7. You may head over to [http://peerprep.online](http://peerprep.online)**, login with the default credentials of email: 'user@test.com' and password: 'password'
   
8. You will see the LeetCode questions being updated

** Due to costs, we may shut down [http://peerprep.online](http://peerprep.online). If you cannot access [http://peerprep.online](http://peerprep.online), deploy our Docker with this set of [instructions](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/blob/dev/docs/Containerization.md).
