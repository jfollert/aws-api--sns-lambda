const AWS = require("aws-sdk");

const SUCCESSFUL_RESPONSE = {
	statusCode: 200,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
	// body: serialize({ result: "Success." }),
	isBase64Encoded: false,
}

// Get enviroment variables
const { API_URL } = process.env;

// Init API Gateway Client
const apiClient = new AWS.ApiGatewayManagementApi({
	endpoint: API_URL,
});

const serialize = object => JSON.stringify(object, null, 2);

class GetConnectionIdController {
	// static event;
	// static context;
	// static callback;

	constructor(event, context, callback) {
		this.event = event;
		this.context = context;
		this.callback = callback;
	}

	sendResponse(connId) {
		console.log('sendResponse()')
		const connectionParams = {
			ConnectionId: connId,
			Data: serialize({ connId: connId }),
		};
	
		apiClient.postToConnection(connectionParams).promise();
		

		// apiClient.postToConnection(connectionParams, (err, data) => console.log(err, data));
	};

	run() {
		console.log('run()')
		const connId = this.event.requestContext.connectionId;
  		this.sendResponse(connId);
		this.callback(null, SUCCESSFUL_RESPONSE);
	}
}

exports.handler = function (event, context, callback) {
	console.log('FIRST_LAMBDA');
	console.info('EVENT:', event);
	console.log(event.Records[0].Sns)
	console.info('CONTEXT:', context);
	// const req = event.body;
	// const res = callback;
	// const controller = new GetConnectionIdController(event, context, callback);
	// controller.run();
	
	
}