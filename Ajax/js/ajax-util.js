(function (global){

		/**
		* 0. Object that is to be exposed to the outer world.
		* 1. Object needed to make a request.
		* 2. An ajax getRequest object to expose it to the outer world, for making request.
		*    We need a requestUrl and a responseParser function, to process the response received from the server.
		* 3. We need a function that would handle the correct response from the server
		*/

		//object to be exposed to the outer world
		var ajaxUtil = {};

		//makes request object making request to the server
		function getRequestObject(){
			if(window.XMLHttpRequest){
				return (new XMLHttpRequest());
			} else if (window.ActiveXObject) {
				return (new ActiveXObject("Microsoft.XMLTTTP"));
			} else {
				global.alert("Ajax is not supported!");
				return (null);
			}
		}

		//the ajaxObject to be used outisde
		ajaxUtil.requestingObject = function (requestingUrl, responseHandler){
			var requestObject = getRequestObject();

			requestingObject.onreadystatechange = function(){
				handleResponse(requestObject, responseHandler);
			}

			requestObject.open("GET", requestingUrl, true);//if false is passed this function will executed synchronously, 
														   //meaning the next step is executed after the request is recieved 
			requestObject.send(null);//if POST request was there, the data would be passed here
		}

		//function calling the responseHandler function for response handling only when the response is correct (status:200)
		function handleResponse(requestObject, responseHandler){
			if((requestObject.readyState==4)
				(requestObject.status == 200)){
				responseHandler(requestObject);
			};
		}

		//exposing the object for use in global scope
		global.$ajaxUtil = ajaxUtil;

	})(window); 