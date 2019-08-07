var config = module.exports = {};

config.env = 'development';
config.hostname = 'http://localhost';
config.SERVERIP = "localhost";

//mongo database
config.mongo = {};
// config.mongo.uri = config.SERVERIP;
config.mongo.uri = '52.90.193.113';
config.mongo.port = '52031';
config.mongo.db = 'flewberDB';

//notify server settings
config.notify = {}
config.notify.url = "http://www.mocky.io/v2"
config.notify.otp = "/5b1a6e513300006f00fb145c"

//access control server settings
config.accesscontrol = {}
config.accesscontrol.url = config.hostname + ":3000/api/isauthorized";


config.server = {}
config.server.url = "https://www.projectarray.com:4000/api/projectarray/user/refund";

config.register = {}
config.register.url = config.hostname + ":3000/api/signup";

config.notify = {}
config.notify.send = {}
config.notify.send.url = config.hostname + ":5000/api/notification/otp/send";

config.notify.resend = {}
config.notify.resend.url = config.hostname + ":5000/api/notification/otp/resend";

config.notify.verify = {}
config.notify.verify.url = config.hostname + ":5000/api/notification/otp/verify";

config.notify.sms = {}
config.notify.sms.url = config.hostname + ":5000/api/notification/notify/sms";

config.paymentCredentials = {}
config.paymentCredentials.MERCHANT_KEY = "s9Vaqgw8"
config.paymentCredentials.MERCHANT_SALT = "UVvIMjEQCq"
config.paymentCredentials.AUTHORIZATION_HEADER = "5kqpLec2JJAReYYMb8yUz0LaB81qFTqAHpvaEK74ufs="
config.paymentCredentials.PROD_MODE = true;



