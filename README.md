
## 👋Welcome to WeBlog
## 📓 Overview
WeBlog is a react project built using [Nextjs 14](https://nextjs.org/docs), [Mongoose](https://mongoosejs.com/docs/index.html), [Authjs](https://authjs.dev/), [Cloudinary](https://cloudinary.com/documentation) and [shadcn](https://ui.shadcn.com/) 
## 📌 Project features
- Registration
- Login
- Posting
- Profile page
- Profile settings
- Search for users
# 📌 Installation

Setting environment variables
| Name | Description | 
| -------- | -------- | 
| DBURL  | Create your cluster at [mongo](https://account.mongodb.com/account/login), and enter the link provided during configuration by adding your username and password | 
| AUTH_SECRET  | You can generate one via running: ```npx auth secret``` . Alternatively, you can use the ```openssl  CLI, openssl rand -base64 33```| 
| AUTH_URL  | http://localhost:3000/api/auth | 
| GITHUB_ID  |  Go to **Github** - **Settings** - **Developer Settings** - **OAuth Apps** - **create your app** - copy the **Client ID** you are given | 
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  | Install [cloudinary](https://cloudinary.com/), go to [console](https://console.cloudinary.com/) and copy **Cloud name** | 
| UPLOAD_PRESET  | your preset name | 
| CLOUD_API_KEY  | **Api key** provided by cloudinary | 
| CLOUD_API_SECRET  | **Api secret** provided by cloudinary | 


## 📃 Usage/Examples

Registration Page
![Nuovo progetto](https://github.com/Priotts/blog/assets/94853311/6f96ba04-36eb-460a-91fe-41d5a643a2fb)

Login Page
![Nuovo progetto (1)](https://github.com/Priotts/blog/assets/94853311/cbab97d3-cb4a-485c-a237-7dbfd0870b30)

Posting Page
![posting](https://github.com/Priotts/blog/assets/94853311/1e801406-ae2f-42f6-915c-613c918587b0)

Profile Page
![profile (1)](https://github.com/Priotts/blog/assets/94853311/76a7ab85-6333-4a69-ad8b-4bc914a5e977)

Settings Page 
![settings (1)](https://github.com/Priotts/blog/assets/94853311/1533df37-d037-4a6d-af86-514c74261b3d)
