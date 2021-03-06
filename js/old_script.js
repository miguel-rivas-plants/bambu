$(window).on("load", function()
{
	$("aside")
		.slideUp(500)
		.parent()
		.find("main #home img")
		.animate({"bottom": 0}, 1000)
		.parent()
		.find(".info")
		.fadeIn(1000);
});

var translateX =
{
	1 : 340,
	2 : 300,
	3 : 250,
	4 : 180,
	5 : 160,
	6 : 120,
	7 : 80,
	8 : 30
};

var background = ["bk_01.png", "bk_02.png", "bk_03.png"];
var separation = 90;
var characters, numberOfPeople;

var checkSize = function(gender, age)
{
	var characters = $("#preview").find(".ch");
	var numberOfPeople = characters.length;
	var position = (age == "old") ? "back" : "front";

	//no se pueden agregar más de 8 personajes
	if(numberOfPeople < 8)
	{
		$("#preview")
			.find(".compos")
			.append("<img src='img/ch_0" + (numberOfPeople + 1) + ".png' class='ch " + position + "'>");

		var characters = $("#preview").find(".ch");
		var numberOfPeople = characters.length;

		for(k = 0; k < (numberOfPeople + 1); k++)
		{
			$(characters[k]).css("left", (separation * k) + translateX[numberOfPeople]);
		}
	}
};

var actualBk = 1;
var maxBk = 3;

var navBackground = function(number)
{
	actualBk += number;
	if(actualBk > 3){ actualBk = 1; }
	if(actualBk < 1){ actualBk = maxBk; }
	$("#preview")
		.find(".compos .base")
		.attr("src", "img/background/bk_0" + actualBk + ".png");
}

var resetCharacters = function()
{
	var root = $(".edit .tools .tabs");

	var obj = ["hair" , "eyes", "nose", "mouth", "skin"];
	var age = ["old", "teen", "child"];

	for(kont in age)
	{
		for(k in obj)
		{
			$(".edit.female." + age[kont] + " .avatar ." + obj[k]).attr("src", "img/characters/female/" + age[kont] + "/" + obj[k] + "_01.png");
			$(".edit.male." + age[kont] + " .avatar ." + obj[k]).attr("src", "img/characters/male/" + age[kont] + "/" + obj[k] + "_01.png");
		}
	}

	$(".edit").find(".tools .tabs a").removeClass("active");
	console.log();
};

$("button.add").on("click", function()
{
	var gender = $(this).parent().parent().attr("class").split(" ")[1];
	var age = $(this).parent().parent().attr("class").split(" ")[2];
	checkSize(gender, age);
});

$(".next").on("click", function()
{
	var active = $("main").find("section.active");
	active.removeClass("active").next().addClass("active");
});

$("#choose").find(".btn").on("click", function()
{
	$(this).parent().removeClass("active");
	$("#preview").addClass("active");
});

$("#choose").find(".characters button").on("click", function()
{
	var gender = $(this).attr("class").split(" ")[0];

	$(this).parent().parent().removeClass("active");
	$(".edit." + gender + ".child").addClass("active");
});

$(".characters, .ageControls").find("button").on("click", function()
{
	resetCharacters();
});

$("#preview").find("button.triangle-left").on("click", function()
{
	navBackground(-1);
});

$("#preview").find("button.triangle-right").on("click", function()
{
	navBackground(1);
});

$("button.back").on("click", function()
{
	var gender = $(this).attr("class").split(" ")[0];

	$(this).parent().parent().removeClass("active");
	$("#choose").addClass("active");
});

$("button.add, button.cancel").on("click", function()
{
	$(this).parent().parent().removeClass("active");
	$("#choose").addClass("active");
});

$(".tabPanel").find(".controls button").on("click", function()
{
	var sectionName = $(this).attr("class").split(" ")[0];

	$(this).addClass("active").siblings().removeClass("active");

	var section = $(this).parent().parent().find("." + sectionName);
	section.addClass("active").siblings().removeClass("active");
});

$(".tools .skin").find("a").on("click", function()
{
	var number = parseInt($(this).find("img").attr("src").split("/").pop().split("_").pop());
	var active = $(this);
	var edit = $("main").find("section.active").attr("class").split(" ");

	$("."+edit[1]+"."+edit[2]).find(".avatar .skin").attr("src", "img/characters/"+edit[1]+"/"+edit[2]+"/skin_0" + number + ".png");

	active.addClass("active").siblings().removeClass("active");
});

$("section.pet .tools .skin").find("a").on("click", function()
{
	var id = $(this).find("img").attr("src").split("_pv.png")[0] + ".png";
	$(".pet").find(".avatar .skin").attr("src", id);
});

$(".tools").find("img").not(".skin img").on("click", function()
{
	var url = $(this).attr("src");
	var name = $(this).parent().parent().attr("class").split(" ")[0];
	var active = $(this).parent();

	$(".avatar").find( "." + name ).attr("src", url);
	active.addClass("active").siblings().removeClass("active");
});

$(".ageControls").find("button").on("click", function()
{
	var age = $(this).attr("class").split(" ")[2];
	var sex = $(this).attr("class").split(" ")[0];
	
	$(".edit." + age + "." + sex).addClass("active").siblings().removeClass("active");
});

$("#preview").find(".mobile a").on("click", function()
{
	$(this).addClass("active").siblings().removeClass("active");
});