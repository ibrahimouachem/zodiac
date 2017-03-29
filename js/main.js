var zodiacKeys = [		'Aquarius',		/* 0 */
						'Pisces',		/* 1 */
						'Aries',		/* 2 */
						'Taurus',		/* 3 */
						'Gemini',		/* 4 */
						'Cancer',		/* 5 */
						'Leo',			/* 6 */
						'Virgo',		/* 7 */
						'Libra',		/* 8 */
						'Scorpio',		/* 9 */
						'Sagittarius',	/* 10 */
						'Capricorn' ];	/* 11 */

//start month, start day, end month, end day
var zodiacDateRange = [	['January', 20, 	'February', 18], 	/* Aquarius */
						['February', 19, 	'March', 20], 		/* Pisces */
						['March', 21, 		'April', 19], 		/* Aries */
						['April', 20, 		'May', 20], 		/* Taurus */
						['May', 21, 		'June', 20], 		/* Gemini */
						['June', 21, 		'July', 22], 		/* Cancer */
						['July', 23, 		'August', 22], 		/* Leo */
						['August', 23, 		'September', 22], 	/* Virgo */
						['September', 23, 	'October', 22], 	/* Libra */
						['October', 23, 	'November', 21], 	/* Scorpio */
						['November', 22, 	'December', 21], 	/* Sagittarius */
						['December', 22, 	'January', 19] ]; 	/* Capricorn */

var zodiacDesc = [		'Trendsetters & Humanitarian.  Although sometimes seen as eccentric, Aquarians are quick thinking, outgoing & loyal.', 		/* Aquarius */
						'Sensitive & Mysterious.  Pisces are often pulled in two directions, which sometimes causes confusion in their life and emotional periods.  However, they are also very talented and resilient.', 		/* Pisces */
						'Enthusiastic & Outgoing.  As a fire sign, Aries are adventurous, independent and all about the action.  At the same time, Aries are able to overcome challenges they are faced with.', 		/* Aries */
						'Determined & Sensual.  Taureans can be mistaken as withdrawn or boring, when actually they are just cool & discreet.  A typical Taurus enjoys life\'s comforts.', 		/* Taurus */
						'Intense & Explorative.  As excellent communicators, Gemini also search out new experiences and lead unique lives.', 		/* Gemini */
						'Compassionate & Contradictory.  A true romantic, Cancerians have a changeable nature and can appear eccentric at one moment, and sensitive the next.', 		/* Cancer */
						'Radiant & Leader.  Leos are the positive thinkers of the zodiac, as such people and opportunities are drawn to them; they are definitely leaders rather than followers.', 		/* Leo */
						'Caring & Confident.  This Earth sign is able to maintain faith, even when things go bad.  Often creative, Virgo is generous and willing to support and care for those around them.', 	/* Virgo */
						'Charming & Harmonious.  This "happy go lucky" sign seek peace, and often are successful at business.', 	/* Libra */
						'Resilient & Powerful.  Scorpio are often passionate about love & power.  There are 3 unique types of Scorpio, but they all are often said to be old souls and sensitive.', 	/* Scorpio */
						'Optimistic & Honest.  Always aiming high, Sagittarians seek adventure & independence, whilst still being one of the zodiac\'s most large hearted signs.', 		/* Sagittarius */
						'Resilient & Patient.  Whether the ambitious goat, or the goat that is content in their own domain, Capricorns are goal achievers, whilst being reliable and sympathetic.' ]; 		/* Capricorn */


//build out the zodiac sign objects
var zodMap = new Object();

for(i in zodiacKeys){
	zodMap[ zodiacKeys[i] ] = createSign( i );
}

console.log( zodMap );


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//this function swithes the fields on the screen 
//this is used when a user does not know their sign
function switchScreen(){

	//creates a month picklist
	var vPicklist = document.getElementById('yourSign');
	vPicklist.innerHTML = 
		'<option value="January">January</option>' +
		'<option value="February">February</option>' +
		'<option value="March">March</option>' +
		'<option value="April">April</option>' +
		'<option value="May">May</option>' +
		'<option value="June">June</option>' +
		'<option value="July">July</option>' +
		'<option value="August">August</option>' +
		'<option value="September">September</option>' +
		'<option value="October">October</option>' +
		'<option value="November">November</option>' +
		'<option value="December">December</option>';

	//this creates the numerical date pick list for the month
	var vDate = document.getElementById('dateList').innerHTML = createDateList();

	//change the header to 'select your birthday'
	var vSign = document.getElementById('main-header').innerHTML = 'Select your birthday';

	//remove the 'dont know sign' link
	var dontKnowButton = document.getElementById('dontKnowSign');
	dontKnowButton.parentNode.removeChild(dontKnowButton);

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//feed in the sign and get back the sign object
function getZodiac(){

	var sign;
	var userInput = document.getElementById('yourSign').value;

	//check if the user selected on of the signs
	if( $.inArray(userInput, zodiacKeys) != -1 ){
		sign = userInput;
	}

	//if they didnt then assume they selected a date
	else {
		var userDate = document.getElementById('yourDate').value;

		for(i in zodMap){

			//see if we found a sign that is after the start date that the user selected
			//or if we found a sign that is before the end date that the user selected
			var foundStart = zodMap[i].startMonth == userInput && userDate >= zodMap[i].startDay;
			var foundEnd = zodMap[i].endMonth == userInput && userDate <= zodMap[i].endDay;

			//if we found one then set the sign variable
			if( foundStart || foundEnd ){
				sign = zodMap[i].name;
			}
		}
	}

	if(sign != null){

		var zodHeader = document.getElementById('zodiac-title-modal');
		var zodBody = document.getElementById('zodiac-body-modal');

		zodHeader.innerHTML = zodMap[sign].name;
		zodBody.innerHTML = '<img src="img/' +zodMap[sign].mainImage+ '.png" >'+
							'<br><br><h4>' +zodMap[sign].dateRange+ '</h4>'+
							zodMap[sign].desc;
	}

	else alert('Ooops! Looks like something went wrong.');

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//populates the dates for the birthday picklist
function createDateList(){
	var dateList = '<select class="btn btn-default btn-height" id="yourDate">';
	for (var i = 1; i <= 31; i++) {
		dateList += '<option value="' + i + '">' + i + '</option>';
	};
	dateList += '</select>';
	return dateList;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//creates a new sign
function createSign(i){

	var thisSign = {
		name: 		zodiacKeys[i],
		desc: 		zodiacDesc[i],
		mainImage: 	zodiacKeys[i].toLowerCase()+'-main',
		dateRange: 	zodiacDateRange[i][0] + ' ' + zodiacDateRange[i][1] + ' - ' + 
					zodiacDateRange[i][2] + ' ' + zodiacDateRange[i][3],
		startMonth: zodiacDateRange[i][0],
		startDay: 	zodiacDateRange[i][1],
		endMonth: 	zodiacDateRange[i][2],
		endDay: 	zodiacDateRange[i][3]
	}

	return thisSign;

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//...these services dont support CORS or JSONp

// var hRequest = new XMLHttpRequest();
// hRequest.open("GET","http://a.knrz.co/horoscope-api/current/gemini", true, '*');
// console.log( hRequest.send() );
// http://a.knrz.co/horoscope-api/help


// var myRequest = new XMLHttpRequest();
// myRequest.open("GET", "http://www.widgets.fabulously40.com/horoscope.json?callback=horoscope&sign=cancer", true);

// console.log(myRequest.send());


// examples:
// http://widgets.fabulously40.com/horoscope.json?sign=cancer
// http://widgets.fabulously40.com/horoscope.yml?sign=cancer
// http://widgets.fabulously40.com/horoscope.xml?sign=cancer

// http://widgets.fabulously40.com/horoscope.json?sign=aries&date=2009-05-03
// http://widgets.fabulously40.com/horoscope.yml?sign=aries&date=2009-05-03
// http://widgets.fabulously40.com/horoscope.xml?sign=aries&date=2009-05-03






