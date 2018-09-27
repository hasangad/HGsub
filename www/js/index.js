/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		//alert("Device IS ready");
		//alert('We are Testing ');
		function checkConnection() {
			var networkState = navigator.connection.type;
			var states = {};
			states[Connection.UNKNOWN] = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI] = 'WiFi connection';
			states[Connection.CELL_2G] = 'Cell 2G connection';
			states[Connection.CELL_3G] = 'Cell 3G connection';
			states[Connection.CELL_4G] = 'Cell 4G connection';
			states[Connection.CELL] = 'Cell generic connection';
			states[Connection.NONE] = 'No network connection';
			//alert('Connection type: ' + states[networkState]);
			if (states[networkState] == states[Connection.NONE]) {
				//alert("أنت غير متصل بالانترنت !");
				$(".check_interent")
					.fadeIn(1000);
			} else {
				//alert("Connected");
				if (localStorage.login_is) {
					$(".splash")
						.hide();
				} else {
					$(".skip_to_home")
						.fadeIn(1000);
				}
			}
			//document.addEventListener("deviceready", onDeviceReady, false);
			//function onDeviceReady() {
			//	console.log(navigator.vibrate);
			//}
			// Vibrate for 1 second
			// Wait for 1 second
			// Vibrate for 3 seconds
			// Wait for 1 second
			// Vibrate for 5 seconds
			//	navigator.vibrate([1000, 1000, 3000, 1000, 5000]);
		}
		checkConnection();
		//FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
		//All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
		//Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
		FCMPlugin.subscribeToTopic('HasanGadSupport');
		FCMPlugin.subscribeToTopic('HasanGadSupportMobile');
		/*---------------------------------------------------------*/
		// SOURCE :: https://forums.adobe.com/thread/2266393
		// SOURCE 2 :: https://github.com/hasangad/cordova-plugin-fcm
		//FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
		//Note that this callback will be fired everytime a new token is generated, including the first time.
		FCMPlugin.onTokenRefresh(function(token) {
			//alert(token);
			localStorage.MobileToken = token;
		});
		//FCMPlugin.getToken( successCallback(token), errorCallback(err) );
		//Keep in mind the function will return null if the token has not been established yet.
		FCMPlugin.getToken(function(token) {
			//alert(token);
			localStorage.MobileToken = token;
		});
		//FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
		//Here you define your application behaviour based on the notification data.
		localStorage.BadgeCount = 0;
		FCMPlugin.onNotification(function(data) {
			if (data.wasTapped) {
				//Notification was received on device tray  and tapped by the user.
				//alert(JSON.stringify(data));
				var GetNotify = JSON.stringify(data);
				//alert(GetNotify);
				//GetNotifyParse  = JSON.parse(GetNotify);
				JSON.parse(GetNotify, (NotifyKey, NotifyValue) => {
					if (NotifyKey === 'TicketID') {
						//return undefined;
						//alert(NotifyValue);
						notify(NotifyValue);
					}
					//alert(NotifyValue);
					//return NotifyValue;
				});
				/*	for (var i = 0; i < JSON.GetNotify.length; i++) {
						alert(parsedArray[i].click_action);
					}*/
				//alert('received on device tray and tapped by the user');
			} else {
				//Notification was received in foreground(while user explore the app )-( Like facebook Notification Bell ). Maybe the user needs to be notified.
				//	alert('Like facebook Notification Bell');
				$BadgeCount = $("#BadgeCount")
					.text();
				//	parseInt :: Convert string to integer
				$("#BadgeCount")
					.text(parseInt($BadgeCount) + 1);
				localStorage.BadgeCount++;
				$('.badge')
					.removeClass('badge-dark');
				$('.badge')
					.addClass('badge-danger');
			}
		});
	}
	/*,
		setupPush: function() {
			console.log('calling push init');
			var push = PushNotification.init({
				"android": {
					"senderID": "499005818743",
				},
				"browser": {},
				"ios": {
					"sound": true,
					"vibration": true,
					"badge": true
				},
				"windows": {}
			});
			console.log('after init');
			push.on('registration', function(data) {
				navigator.notification.beep(1);
				console.log('registration event: ' + data.registrationId);
				var oldRegId = localStorage.getItem('registrationId');
				if (oldRegId !== data.registrationId) {
					// Save new registration ID
					localStorage.setItem('registrationId', data.registrationId);
					// Post registrationId to your app server as the value has changed
				}
				var parentElement = document.getElementById('registration');
				var listeningElement = parentElement.querySelector('.waiting');
				var receivedElement = parentElement.querySelector('.received');
				listeningElement.setAttribute('style', 'display:none;');
				receivedElement.setAttribute('style', 'display:block;');
			});
			push.on('error', function(e) {
				console.log("push error = " + e.message);
			});
			push.on('notification', function(data) {
				//console.log('notification event');
				navigator.notification.alert(data.message, // message
					null, // callback
					data.title, // title
					'Ok' // buttonName
				);
			});
		}*/
};
//app.setupPush();