[![](https://badge.imagelayers.io/jonnybgod/ghost:latest.svg)](https://imagelayers.io/?images=jonnybgod/ghost:latest)

# What is Ghost?
Ghost is a free and open source blogging platform written in JavaScript and distributed under the MIT License, designed to simplify the process of online publishing for individual bloggers as well as online publications.

![alt text](https://raw.githubusercontent.com/docker-library/docs/c5b6d94dc8f0557925ab37ca43141c0efc5cc363/ghost/logo.png "Ghost logo")

> https://ghost.org/


# How to use this image

```bash
docker run --name some-ghost -d jonnybgod/ghost
```

This will start a Ghost instance listening on the default Ghost port of 2368.

If you'd like to be able to access the instance from the host without the container's IP, standard port mappings can be used:

```bash
docker run --name some-ghost -p 8080:2368 -d jonnybgod/ghost
```

Then, access it via http://localhost:8080 or http://host-ip:8080 in a browser.

You can also point the image to your existing content on your host:

```bash
docker run --name some-ghost -v /path/to/ghost/blog:/var/lib/ghost jonnybgod/ghost
```

Alternatively you can use a data container that has a volume that points to /var/lib/ghost and then reference it:

```bash
docker run --name some-ghost --volumes-from some-ghost-data jonnybgod/ghost
```

### Optional Variables:
* `URL`: specify the elasticsearch index (default: http://localhost:2368)
* `HOST`: specify the IP address that Ghost should listen on (default: 0.0.0.0)
* `PORT`: specify the port number that Ghost should listen on (default: 2368)

#### database (dafaults to local sqlite):
* `MYSQL_HOST`: specify the database endpoint
* `MYSQL_USER`: specify the database username
* `MYSQL_PASSWORD`: specify the database password
* `MYSQL_DATABASE`: specify the database name

or

* `POSTGRES_HOST`: specify the database endpoint
* `POSTGRES_PORT`: specify the database port
* `POSTGRES_USER`: specify the database username
* `POSTGRES_PASSWORD`: specify the database password
* `POSTGRES_DATABASE`: specify the database name

#### s3 storage (defaults to false meaning no storage):
* `S3_ACCESS_KEY_ID`: specify the AWS IAM user key_id
* `S3_ACCESS_SECRET_KEY`: specify the AWS IAM user secret_key
* `S3_BUCKET_NAME`: specify the AWS S3 bucket name
* `S3_REGION`: specify the AWS S3 region

#### email (defaults to false meaning no emails):
* `MAIL_SERVICE`: specify email service
* `MAIL_USER`: specify email service smtp username
* `MAIL_PASSWORD`: specify email service smtp password

> http://support.ghost.org/config/#database

#### The docker-compose service definition should look as follows:

```yalm
blog:
  image: jonnybgod/ghost
  command: npm start --production
  environment:
    URL: http://example.com
    MYSQL_HOST: <YOUR_MYSQL_HOST>
    MYSQL_USER: <YOUR_MYSQL_USER>
    MYSQL_PASSWORD: <YOUR_MYSQL_PASSWORD>
    MYSQL_DATABASE: <YOUR_MYSQL_DB>
    S3_ACCESS_KEY_ID: <YOUR_S3_ACCESS_KEY_ID>
    S3_ACCESS_SECRET_KEY: <YOUR_S3_ACCESS_SECRET_KEY>
    S3_BUCKET_NAME: <YOUR_S3_BUCKET_NAME>
    S3_REGION: <YOUR_S3_REGION>
    MAIL_SERVICE: Mailgun
    MAIL_USER: <YOUR_MAILGUN_SMTP_USER>
    MAIL_PASSWORD: <YOUR_MAILGUN_SMTP_PASSWORD>
  restart: always
```
