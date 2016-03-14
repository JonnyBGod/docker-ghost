var path = require('path'),
config,
fileStorage,
storage,
mail,
database;

if (!!process.env.S3_ACCESS_KEY_ID) {
	fileStorage = true;
	storage = {
		active: 'ghost-s3',
		'ghost-s3': {
			accessKeyId: process.env.S3_ACCESS_KEY_ID,
			secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
			bucket: process.env.S3_BUCKET_NAME,
			region: process.env.S3_REGION
		}
	};
} else {
	fileStorage = false;
	storage = {};
}

if (!!process.env.MAIL_SERVICE) {
	mail = {
		transport: 'SMTP',
		options: {
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			}
		}
	};
} else {
	mail = false;
}

if (!!process.env.MYSQL_HOST) {
	database = {
		client: 'mysql',
		connection: {
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			charset: 'utf8'
		},
		debug: false
	};
}else if (!!process.env.POSTGRES_HOST) {
	database = {
		client: 'postgres',
		connection: {
			host: process.env.POSTGRES_HOST,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			charset: 'utf8'
		},
		debug: false
	};
} else {
	database = {
		client: 'sqlite3',
		connection: {
			filename: path.join(__dirname, '/content/data/ghost.db')
		},
		debug: false
	};
}


config = {
	production: {
		url: process.env.URL || 'http://localhost:2368',
		mail: mail,
		fileStorage: fileStorage,
		storage: storage,
		database: database,
		server: {
			host: process.env.HOST || '0.0.0.0',
			port: process.env.PORT || '2368'
		}
	}
};

module.exports = config;