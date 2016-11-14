// Common file
module.exports = {
	//Check Title of page
	checkTitle : function (correctTitle){
        return browser
        .getTitle().then(function(title){
        	console.log(title);
            expect(title).to.be.equal(correctTitle);
        })
	},
	//Check links on page
	link : function(cssSelector,originalLink){
		return browser
		.getAttribute(cssSelector,'href').then(function(value){
			//console.log('anchor tag value is ' + value);
			expect(value).to.be.equal(originalLink);
		})
	},
	//Dropdown selector
	dropdown : function(cssSelector,dropdownValue){
		console.log('dropdown included');
		console.log(cssSelector);
		console.log(dropdownValue);
		return browser
	    .getText(cssSelector).then(function(value){
	    	console.log('dropdownValue' + value);
	        expect(value).to.be.equal(dropdownValue);
	    })
	},
	//Check Plan price with respect to promocode 'newAcctPrice' obtained from wdio.conf file
	checkPrice: function(cssSelector,price){
		return browser
		.getHTML(cssSelector).then(function(value){
			expect(value).to.contain(price);
		})
	},
	//Check the text for hover 
	checkHover: function(cssSelector,explanationSelector,originalText){
		console.log('mouse hover');
		return browser
		.pause(5000)
		.click(cssSelector)
		.waitForText(explanationSelector,5000)
		.getText(explanationSelector).then(function(value){
			console.log(value);
			expect(value).to.contain(originalText);
		})
		.moveToObject(cssSelector,100,10)
	},
	//Check Footer links
	footer: function(){
		return browser
		.getAttribute('=AOL Inc.', 'href')
		.then(function(footerLink){
			//console.log(footerLink);
			expect(footerLink).to.be.equal('Original footer link to be compared')
		})
		.getAttribute('=Privacy Policy', 'href')
		.then(function(footerLink){
			//console.log(footerLink);
			expect(footerLink).to.be.equal('Original Privacy link to be compared')
		})
		.getAttribute('=Terms Of Service', 'href')
		.then(function(footerLink){
			//console.log(footerLink);
			expect(footerLink).to.be.equal('Original Terms of service link to be compared')
		})
		.getAttribute('=About Our Ads', 'href')
		.then(function(footerLink){
			//console.log(footerLink);
			expect(footerLink).to.be.equal('Original About Ads to be compared')
		})
		.getAttribute('=Site Map', 'href')
		.then(function(footerLink){
			//console.log(footerLink);
			expect(footerLink).to.be.equal('Original Site Map link to be compared')
		})
		.element('#footer')
		.getAttribute('=Help', 'href')
		.then(function(footerLink){
			//console.log(footerLink);
			expect(footerLink).to.be.equal('Original Help link to be compared')
		})
	},
	//Check Header links
	header: function(){
		return browser
		.getAttribute('=My Account','href')
		.then(function(headerLink){
			//console.log(headerLink);
			expect(headerLink).to.be.equal('Original My Account link to be compared')
		})
		.element('#header')
		.getAttribute('=Help','href')
		.then(function(headerLink){
			//console.log(headerLink);
			expect(headerLink).to.be.equal('Original Help link to be compared')
		})
	},
	//Check for printing page
	printPage: function(cssSelector){
		return browser
		.getAttribute(cssSelector,'onclick')
		.then(function(onClickValue){
			console.log(onClickValue);
			expect(onClickValue).to.be.equal('window.print();');
		})
	},
	cardInfo: function(){
		var cardNumber = ['463726483276327','53647832468327','53782173912832219','33772327312893217','3372837128731293','638274327432829'],
			cardNumberLength = cardNumber.length,
			cardNumberposition = parseInt(Math.random()*cardNumberLength),
			validCode,
			firstDigit
		global.cardNumberSelcted = cardNumber[cardNumberposition]
			console.log(cardNumberSelcted.length);
			if(cardNumberSelcted.length == '16'){
				validCode = '256';
			}else {
				validCode = '6735';
			}
			if(cardNumberSelcted.match(/^4/g)){
				console.log('Visa Card')
			}if (cardNumberSelcted.match(/^5/g)){
				console.log('Master Card')
			}if (cardNumberSelcted.match(/^3/g)){
				console.log('Amex Card')
			}if (cardNumberSelcted.match(/^6/g)){
				console.log('Discover Card')
			}
			return browser
			.setValue('#card_number',cardNumberSelcted)
            .setValue('#validationCode',validCode)
	},
	overlay: function(){
		console.log('overlay called');
		return browser
		.click('.acctinfo h2+p .modal')
		.waitForVisible('#modalWindow',5000)
		.getText('#modalWindow .accountReminderBody .rightCol p').then(function(text){
			expect(text).to.be.equal('Yes. I\'ve written down my username and password. Now take me to my requested destination.')
		})
		.click('#modalWindow #closeModal')
		.pause(5000)
	},
	checkUsername: function(cssSelector){
        return browser
        	   .getText(cssSelector).then(function(unameValue){
            		expect(unameValue).to.contain(username);
        		})
	},
	formValues: function(){
		global.fname;
		global.lname;
		global.addr;
		global.city;
		global.state;
		global.zip;
		global.phone;
		return browser
		.getValue('#fname').then(function(fnameValue){
			fname = fnameValue;
		})
        .getValue('#lname').then(function(lnameValue){
			lname = lnameValue;
		})
        .getValue('#zip').then(function(zipValue){
			zip = zipValue;
		})
        .getValue('#city').then(function(cityValue){
            city = cityValue;
        })
        .getText('#state_custom .selectME.gselected').then(function(stateValue){
        	state = stateValue
        })
        .getValue('#addr1').then(function(addrValue){
			addr = addrValue;
		})
        .getValue('#ephone').then(function(phoneValue){
			phone = phoneValue;
		})
		.then(function(){
			console.log(fname + lname + addr + city + state + zip + phone)
		})
	},
	checkCreditCardNum: function(cssSelector){
	    return browser
           .getText(cssSelector).then(function(creditCardNum){
                //expect(creditCardNum).to.contain(username);
                console.log(cardNumberSelcted)
                var lastDigits = cardNumberSelcted.substr(cardNumberSelcted.length-4);
                console.log(lastDigits);
                expect(creditCardNum).to.contain(lastDigits);
            })
	}
}
