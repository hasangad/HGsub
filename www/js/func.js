/*------------------------------------*/
function pad(str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

function notify(T_id_is) {
	//console.log(T_id_is); debugger; alert("clicked"); $(".ticket_link").on("click", notify); alert('test');
	//alert(T_id_is);
	//$fav_is = pad(T_id_is, 9);
	$fav_is = T_id_is;
	//alert($fav_is);
	if ($fav_is !== "") {
		$(".preloader")
			.fadeIn();
		$t_id = $fav_is;
		var url = "https://hasangad.com/support/api/?Ticket_id=" + $t_id;
		$.getJSON(url, function(tick) {
			$("#main_page .posts")
				.html("");
			$("#main_page .posts")
				.append('<div class="col-xs-12 no-padding"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning col-xs-12">حالة التذكرة : ' + tick['ticket'].status + '</span></div><br />');
			//$("#main_page .posts").append("التذكرة <b>" + $t_id + "</b>");
			$("#main_page .posts")
				.append('<div class="col-xs-12 no-padding"><textarea class="u_comment form-control"></textarea><input type="hidden" class="t_id2" value="' + $t_id + '" /><button class="btn btn-primary col-xs-12 add_comment">أرسل رد <i class="fa fa-paper-plane"></i></button></div>');
			$.each(tick['comment'], function(i, comment) {
				$("#main_page .posts")
					.append('<div class="col-xs-12 comment"><h2>' + comment.c_date + '</h2><p>' + comment.content + '</p></div>');
			});
			$("#main_page .posts")
				.append('<div class="col-xs-12 main_ticket"><p>' + tick['ticket'].content + '</p></div>');
			$('.tickets  , .products')
				.slideUp();
			$(".preloader")
				.fadeOut();
		});
	}
}
var MenuPos = 0;

function show_menu() {
	//$("#show_menu").click(function() {
	if (MenuPos == 0) {
		$("#show_menu i")
			.removeClass('fa-bars');
		$("#show_menu i")
			.addClass('fa-arrow-left');
		$(".bottom_buttons")
			.animate({
				"left": "20%"
			});
		$("#main_page,.logo,.login_success,.NotifyBell")
			.css({
				"filter": "blur(7px)"
			});
		MenuPos = 1;
	} else {
		$("#show_menu i")
			.addClass('fa-bars');
		$("#show_menu i")
			.removeClass('fa-arrow-left');
		$(".bottom_buttons")
			.animate({
				"left": "-100%"
			});
		$("#main_page,.logo,.login_success,.NotifyBell")
			.css({
				"filter": "blur(0px)"
			});
		MenuPos = 0;
	}
	console.log(MenuPos);
	//});
}
/////////////////////////////////////////////////
$('.main_menu a')
	.click(function() {
		$("#show_menu i")
			.addClass('fa-bars');
		$("#show_menu i")
			.removeClass('fa-arrow-left');
		$(".bottom_buttons")
			.animate({
				"left": "-80%"
			});
		$("#main_page,.logo,.login_success,.NotifyBell")
			.css({
				"filter": "blur(0px)"
			});
		if (MenuPos == 0) {
			MenuPos == 1;
		} else {
			MenuPos = 0;
		}
		console.log(MenuPos);
	});
var password = document.getElementById("password"),
	confirm_password = document.getElementById("confirm_password");

function validatePassword() {
	if (password.value != confirm_password.value) {
		confirm_password.setCustomValidity("Passwords Don't Match");
	} else {
		confirm_password.setCustomValidity('');
	}
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
//alert(localStorage.token);
function new_user() {
	/*$("#creat_new_user")
		.submit(function() {*/
	//alert('test');
	$user_email = $('.user_email')
		.val();
	$user_pass = $('.user_pass')
		.val();
	$user_re_pass = $('.user_re_pass')
		.val();
	$user_mobile = $('.user_mobile')
		.val();
	if (($user_pass != "") && ($user_re_pass != "") && ($user_pass == $user_re_pass)) {
		$('.preloader')
			.fadeIn();
		var url = "https://hasangad.com/support/api/?new_user=true&user_email=" + $user_email + "&user_pass=" + $user_pass + "&user_mobile=" + $user_mobile + "&user_token=" + localStorage.token;
		console.log(url);
		$.getJSON(url, function(new_user) {
			console.log(new_user);
			$('#new_user_holder form')
				.fadeOut();
			$("#new_user_holder")
				.html("<div class='alert alert-success'>تم تسجيل المستخدم بنجاح .</div>");
			/*$.each(slides, function(i, slide) {
				if ($num_is == 0) {
					$(".carousel-inner")
						.append('<div class="carousel-item active"><img src="' + slide.slide + '" /></div>');
				} else {
					$(".carousel-inner")
						.append('<div class="carousel-item"><img src="' + slide.slide + '" /></div>');
				}*/
		});
		$('.preloader')
			.fadeOut();
	}
	/*});*/
}
/*------------------- Ticket Query --------------------------*/
$(document)
	.on('click', '.t_show', function() {
		//localStorage.favs = "";
		if ($(".t_id")
			.val() !== "") {
			$(".preloader")
				.fadeIn();
			$t_id = $(".t_id")
				.val();
			//To store the array, do what you're doing: localStorage.setItem("favs", JSON.stringify(favs));
			var favs = JSON.parse(localStorage.getItem("favs") || "[]");
			console.log("# of favs: " + favs.length);
			favs.forEach(function(fav, index) {
				console.log("[" + index + "]: " + fav.id);
			});
			//localStorage.checked_tickets =+ $t_id; alert($t_id);
			var url = "https://hasangad.com/support/api/?Ticket_id=" + $t_id;
			//alert(url);
			$.getJSON(url, function(tick) {
				//alert("test"); console.log(result);
				$("#main_page .posts")
					.html("");
				$("#main_page .posts")
					.append('<div class="col-xs-12"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning">' + tick['ticket'].status + '</span></div>');
				$("#main_page .posts")
					.append('<div class="col-xs-12"><textarea class="u_comment form-control"></textarea><input type="hidden" class="t_id2" value="' + $t_id + '" /><button class="btn btn-success add_comment">أرسل رد</button></div>');
				$.each(tick['comment'], function(i, comment) {
					//alert('inside comments');
					$("#main_page .posts")
						.append('<div class="col-xs-12 comment"><h2>' + comment.c_date + '</h2><p>' + comment.content + '</p></div>');
				});
				$("#main_page .posts")
					.append('<div class="col-xs-12"><p>' + tick['ticket'].content + '</p></div>');
				$CheckExistsFavs = favs.indexOf($t_id);
				//alert($CheckExistsFavs);
				if ($CheckExistsFavs == -1) {
					favs.push($t_id);
					// Saving
					localStorage.setItem("favs", JSON.stringify(favs));
					//alert(localStorage.getItem("favs"));
				}
				$(".preloader")
					.fadeOut();
			});
		}
	});
/*------------------- End of query show ---------------------*/
function get_branchs(storedID) {
	var dataBranchs = "get_branchs=true&user=" + storedID;
	var url_user_branch = "https://hasangad.com/support/api/?" + dataBranchs;
	console.log(url_user_branch);
	$.getJSON(url_user_branch, function(u_branch) {
		console.log(u_branch);
		$(".logged_in .products .table-responsive")
			.html("");
		$.each(u_branch, function(i, br) {
			//alert(tr.pr_sn);
			$branch = br.branch;
			$(".logged_in .products .table-responsive")
				.append('<table class="table table-striped"><tr><td>فرع</td><td><a onclick="get_branch_products(' + "'" + $branch + "'" + ')">' + br.branch + '</a></td></tr><table>');
		});
	});
}
////////////////////////////////////////////////////
function get_branch_products($branch_is) {
	$(".com_products h2 b")
		.html('أجهزة فرع : ' + $branch_is);
	$(".com_products .table-responsive")
		.html("");
	//alert($branch_is);
	$('.new_forms > form')
		.hide();
	$('.com_products')
		.show();
	$(".new_forms")
		.animate({
			"top": "10%",
			"opacity": "0.92"
		});
	var dataProducts = "get_branch_products=true&user=" + $storedID + "&br_name=" + $branch_is;
	var url_com_prdct = "https://hasangad.com/support/api/?" + dataProducts;
	console.log(url_com_prdct);
	$.getJSON(url_com_prdct, function(u_b_prdct) {
		console.log(u_b_prdct);
		/*$(".logged_in .products .table-responsive")
			.html("");*/
		$.each(u_b_prdct, function(i, tr) {
			//alert(tr.pr_sn);
			$(".com_products .table-responsive")
				.append('<table class="table table-striped"><tr><td>product</td><td>' + tr.c_product + '</td></tr><tr><td>Serial No.</td><td>' + tr.pr_sn + '</td></tr><tr><td>Buy Date</td><td>' + tr.b_date + '</td></tr><table>');
		});
	});
	$branch_name = $branch_is;
}
/*// Get Products */
function get_user_prdcts(storedID) {
	var dataProducts = "get_products=true&user=" + storedID;
	var url_user_prdct = "https://hasangad.com/support/api/?" + dataProducts;
	console.log(url_user_prdct);
	$.getJSON(url_user_prdct, function(u_prdct) {
		console.log(u_prdct);
		$(".logged_in .products .table-responsive tbody")
			.html("");
		$.each(u_prdct, function(i, tr) {
			//alert(tr.pr_sn);
			$(".logged_in .products .table-responsive tbody")
				.append('<table class="table table-striped"><tr><td>product</td><td>' + tr.c_product + '</td></tr><tr><td>Serial No.</td><td>' + tr.pr_sn + '</td></tr><tr><td>Buy Date</td><td>' + tr.b_date + '</td></tr><table>');
		});
	});
}
/*------------ new  branch ----------------*/
function new_branch() {
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$br_name = $('.br_name')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://hasangad.com/support/api/?add_branch=true&user_name=" + $author_username + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&br_name=" + $br_name;
	//console.log(url);
	$.getJSON(url, function(add_branch) {
		console.log(add_branch);
		$('.close_forms')
			.click();
		//alert($author_id);
		get_branchs($author_id);
		$(".preloader")
			.fadeOut();
	});
};
/*// Get Tickets*/
function get_user_tickets(storedID) {
	$(".preloader")
		.fadeIn();
	var dataTickets = "get_tickets=true&user=" + storedID;
	var url_user_tickets = "https://hasangad.com/support/api/?" + dataTickets;
	$.getJSON(url_user_tickets, function(u_ticks) {
		//alert('get_products');
		console.log(u_ticks);
		$(".logged_in .tickets table tbody")
			.html("");
		$.each(u_ticks, function(i, tr) {
			$(".logged_in .tickets table tbody")
				.append('<tr>' + tr.tr + '</tr>');
		});
	});
	$(".preloader")
		.fadeOut();
}

function new_product() {
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$prd_model = $('.jt_model')
		.val();
	$pr_sn = $('.pr_sn')
		.val();
	$b_date = $('.b_date')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://hasangad.com/support/api/?add_product=true&user_name=" + $author_username + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&prd_model=" + $prd_model + "&pr_sn=" + $pr_sn + "&b_date=" + $b_date + "&branch=" + $branch_name;
	console.log(url);
	$.getJSON(url, function(add_product) {
		//console.log(add_product);
		get_user_prdcts($author_id);
		$('.close_forms')
			.click();
		//alert($author_id);
		get_branchs($author_id);
		$(".preloader")
			.fadeOut();
	});
};

function new_ticket() {
	//alert("new");
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$prd_model = $('.jt_model')
		.val();
	$pr_sn = $('.t_pr_sn')
		.val();
	$b_date = $('.b_date')
		.val();
	$u_address = $('.u_address')
		.val();
	$u_notes = $('.u_notes')
		.val();
	$t_branch = $('.t_branch')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://hasangad.com/support/api/?add_ticket=true&user_name=" + $author_username + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&prd_model=" + $prd_model + "&pr_sn=" + $pr_sn + "&b_date=" + $b_date + "&u_address=" + $u_address + "&u_notes=" + $u_notes + "&t_branch=" + $t_branch;
	//console.log(url);
	$.getJSON(url, function(add_ticket) {
		console.log(add_ticket);
		//get_user_tickets($author_id);
		$('.close_forms')
			.click();
		//alert($author_id);
		get_user_tickets($author_id);
		$(".preloader")
			.fadeOut();
	});
};
$(document)
	.on('click', '.add_comment', function() {
		new_comment();
	});

function new_comment() {
	//alert("new");
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$t_id = $('.t_id2')
		.val();
	$u_comment = $('.u_comment')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://hasangad.com/support/api/?add_comment=true&user_name=" + $author_username + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&u_comment=" + $u_comment + "&t_id=" + $t_id;
	console.log(url);
	$.getJSON(url, function(add_comment) {
		//console.log(add_comment);
		notify($t_id);
		//get_user_tickets($author_id);
		//$('.close_forms').click();
		//alert($author_id);
		//get_user_tickets($author_id);
		$(".preloader")
			.fadeOut();
	});
};

function order_pr() {
	//alert("new");
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$u_name_order = $('.u_name_order')
		.val();
	$u_address_order = $('.u_address_order')
		.val();
	$u_mobile_order = $('.u_mobile_order')
		.val();
	$pr_model_order = $('.pr_model_order')
		.val();
	$u_notes_order = $('.u_notes_order')
		.val();
	$u_email_order = $('.u_email_order')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://hasangad.com/support/api/?order_pr=true&user_name=" + $author_username + "&u_name_order=" + $u_name_order + "&u_address_order=" + $u_address_order + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&u_notes_order=" + $u_notes_order + "&pr_model_order=" + $pr_model_order + "&u_mobile_order=" + $u_mobile_order + "&u_email_order=" + $u_email_order;
	console.log(url);
	$.getJSON(url, function(order_pr_now) {
		console.log(order_pr_now);
		//get_user_tickets($author_id);
		//$('.close_forms').click();
		//alert($author_id);
		//get_user_tickets($author_id);
		$('.order_pr')
			.slideUp();
		$('.order_form')
			.slideUp();
		$('.order_sent')
			.slideToggle();
		$(".preloader")
			.fadeOut();
	});
};
$('.close_forms')
	.click(function() {
		$(".new_forms")
			.animate({
				"top": "100%"
			});
	});
$('.add_prdct')
	.click(function() {
		//alert('clicked');
		$('.new_forms > form')
			.hide();
		$('.new_product')
			.show();
		$(".new_forms")
			.animate({
				"top": "10%",
				"opacity": "0.92"
			});
		$('.branch')
			.val($branch_name);
	});
$('.add_branch')
	.click(function() {
		$('.new_forms > form')
			.hide();
		$('.new_branch')
			.show();
		$(".new_forms")
			.animate({
				"top": "10%",
				"opacity": "0.92"
			});
	});
$('.add_ticket')
	.click(function() {
		$('.new_forms > form')
			.hide();
		$('.new_ticket')
			.show();
		$(".new_forms")
			.animate({
				"top": "10%",
				"opacity": "0.92"
			});
	});
$(document)
	.ready(function() {
		/*------------------------------------*/
		$(".preloader")
			.fadeOut(500);
		/*------------------------------------*/
		var BellPos = 0;
		$('.NotifyBell')
			.click(function() {
				if (BellPos == 0) {
					$("#main_page,.logo,.login_success")
						.css({
							"filter": "blur(7px)"
						});
					$('.badge')
						.removeClass('badge-dark');
					$('.badge')
						.addClass('badge-danger');
					$('.NotifyBellMenu')
						.show();
					BellPos = 1;
				} else {
					$("#main_page,.logo,.login_success")
						.css({
							"filter": "blur(0px)"
						});
					BellPos = 0;
					$('.badge')
						.addClass('badge-dark');
					$('.badge')
						.removeClass('badge-danger');
					$('.NotifyBellMenu')
						.hide();
				}
				$("#BadgeCount")
					.text("0");
			});
		/*--------------------------------------*/
		/*Check of user logged in before and stored by webstorage*/
		$storedName = localStorage.getItem('login_is');
		$storedPw = localStorage.getItem('pass_is');
		$storedID = localStorage.getItem('u_id');
		$storedAccType = localStorage.getItem('acc_type');
		//alert($storedName + $storedPw + $storedID);
		if ((($storedName !== "") && ($storedPw !== "")) && (($storedName !== null) && ($storedPw !== null))) {
			$('.login_form, .login_link')
				.remove();
			//$('.slide').hide();
			//$('.new_user_home').hide();
			$(".login_success")
				.html("مرحباً بعودتك / " + $storedName);
			$(".login_success")
				.fadeIn("1000");
			$(".login_form")
				.hide();
			$(".logged_in")
				.show();
			$("#logout")
				.removeClass('hidden');
			$(".login_link")
				.addClass('hidden');
			//	alert($storedAccType);
			$("#BadgeCount")
				.text(localStorage.BadgeCount);
			if (localStorage.BadgeCount > 0) {
				$('.badge')
					.removeClass('badge-dark');
				$('.badge')
					.addClass('badge-danger');
			}
			if ($storedAccType == "personal") {
				get_user_prdcts($storedID);
				get_user_tickets($storedID);
				$(".company")
					.hide();
			} else if ($storedAccType == "company") {
				get_branchs($storedID);
				get_user_tickets($storedID);
				$(".personal")
					.hide();
			} else {
				get_user_tickets($storedID);
			}
		}
		/*///////////////// Get Slides /////////////////////////*/
		var url = "https://hasangad.com/support/api/?slides_is=show";
		//alert(url);
		$(".favs table tbody")
			.html("");
		$.getJSON(url, function(slides) {
			//alert(slides);
			console.log(slides);
			$num_is = 0;
			$.each(slides, function(i, slide) {
				if ($num_is == 0) {
					$(".carousel-inner")
						.append('<div class="carousel-item active"><img src="' + slide.slide + '" /></div>');
				} else {
					$(".carousel-inner")
						.append('<div class="carousel-item"><img src="' + slide.slide + '" /></div>');
				}
				$num_is++;
			});
		});
		/*///////////// Login Form //////////////////////*/
		$("#logout")
			.click(function() {
				$("#logout")
					.addClass('hidden');
				localStorage.login_is = "";
				localStorage.pass_is = "";
				localStorage.u_id = "";
				window.location.href = "index.html";
			});

		function get_history() {
			$get_favs_array = localStorage.getItem("favs");
			if ($get_favs_array !== "" || $get_favs_array !== null) {
				$new_favs = $.parseJSON($get_favs_array);
				if ($new_favs !== null) {
					$.each($new_favs, function(i, fav) {
						//alert(fav);
						var url = "https://hasangad.com/support/api/?Ticket_id=" + fav;
						//alert(url);
						$(".favs table tbody")
							.html("");
						$.getJSON(url, function(tick) {
							//alert("test"); console.log(result); $u_fake_id = $storedID * 2; alert($u_fake_id);  alert(fav); $fav_is = fav;
							$(".favs table tbody")
								.append('<tr><td>' + fav + '</td><td><a href="#" data-link="' + fav + '" id="ticket_link" class="ticket_link" onclick="notify(' + fav + ')">' + tick['ticket'].title + '</a></td><td><span class = "btn btn-warning" > ' + tick['ticket'].status + '</span></td></tr> ');
						});
					});
				}
			}
		}

		function do_login() {
			var user = $(".user")
				.val();
			var pass = $(".pass")
				.val();
			//var MobileToken = localStorage.MobileToken;
			var MobileToken = localStorage.MobileToken;
			//alert(MobileToken);
			//alert(user);
			//var dataString = "user=" + user + "&pass=" + pass + "&login=";
			var dataString = "user=" + user + "&pass=" + pass + "&UpdateMobileToken=" + MobileToken;
			var url2 = "https://hasangad.com/support/api/?" + dataString;
			//debugger;
			$.getJSON(url2, function(login) {
				//debugger;
				//alert("test");
				console.log(login);
				$login_status = login.status;
				$MobileTokenDB = login.MobileTokenDB;
				$MobileTokenStatus = login.MobileTokenStatus;
				$u_id = login.u_id;
				if ($login_status == true) {
					get_user_tickets($u_id);
					// REFRENCE : https://www.w3schools.com/html/html5_webstorage.asp https://www.w3schools.com/jsref/prop_win_localstorage.asp
					localStorage.login_is = user;
					localStorage.pass_is = pass;
					localStorage.u_id = $u_id;
					//localStorage.acc_type = $acc_type;
					//alert("Login Success");
					$(".login_form")
						.stop()
						.slideToggle();
					$(".login_success")
						.fadeIn("1000");
					$("#logout")
						.removeClass("hidden");
					$(".login_link")
						.addClass('hidden');
					/*-----------------*/
					//alert($u_id);
					$('.slide')
						.hide();
					/*	if ($acc_type == "personal") {
							get_user_prdcts($u_id);
							get_user_tickets($u_id);
						}
						if ($acc_type == "company") {
							get_branchs($u_id);
							get_user_tickets($u_id);
						}*/
					$(".logged_in")
						.fadeIn("1000");
					//$(".login_success").fadeOut("3000");
				} else if ($login_status == false) {
					$("#login")
						.html('تسجيل الدخول');
				}
			});
		}
		$("#login,#login_2")
			.click(function() {
				do_login();
			});
		/*------------ menu clicks -------------------*/
		$(".main_menu a i")
			.click(function() {
				/*  $(".main_menu a i")
				    .css({
				      "color": "#888888"
				    });*/
				$(this)
					.css({
						"color": "#FFBD54"
					});
			});
		$(".skip_to_home")
			.click(function() {
				$(".splash")
					.animate({
						"right": "-100%"
					});
			});
		$(".skip_to_home_icon")
			.click(function() {
				$(".splash")
					.animate({
						"right": "-100%"
					});
			});
		$(".bottom_buttons a")
			.click(function() {
				$(".bottom_buttons")
					.animate({
						"left": "-100%"
					});
			});
		$(".show_pr")
			.click(function() {
				$(".page")
					.slideUp();
				$(".product_is")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".order_pr")
			.click(function() {
				$(".pr-description")
					.stop()
					.slideToggle();
				$(".order_form")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".new_user")
			.click(function() {
				$(".splash")
					.animate({
						"right": "-100%"
					});
				$(".page")
					.slideUp();
				$("#new_user")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".login_link")
			.click(function() {
				$(".page")
					.slideUp();
				$(".login_form")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".user_index")
			.click(function() {
				$(".page")
					.slideUp();
				$("#user_index")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".search_link")
			.click(function() {
				$(".page")
					.slideUp();
				$(".check_ticket_by_number")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".show_about")
			.click(function() {
				$(".page")
					.slideUp();
				$(".about")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".show_favorites")
			.click(function() {
				$(".page")
					.slideUp();
				$(".favs")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
				get_history();
			});
	});