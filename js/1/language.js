	

function getLanguage(lc){
                console.log("getLanguage(" + lc + ")");
                $("#language-label").html($("#" + lc).text());
                languageCode = lc;
                cartBuilt = false;
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.log(lc);
				$.post("./php/get_native_language.php", {language_code: lc,}, 
				   function(result){
                    
					//itereate through JSON object and update UI
					//$('#quantity-label').html('testing');
					
					//var obj = JSON.parse(result);
                            var j = 0;
                            langDocument = JSON.parse(result);
                            var tags = document.querySelectorAll('div,input,span,a,label,option,textarea,select,button');
					         var locale = languageCode + "-" + countryCode;
                            Array.from(tags).forEach(function(value, index){
                            var key = value.dataset.languagekey;
                                
                                //if(value.tagName == "DIV"){
                                     //console.log(value.tagName);
                                     //console.log(value.clientWidth);
                                //}
                                if(key !== undefined){
                                    //console.log("--->" + key);
                                }
                            j++;
                            //langDocument['is-left-to-right']
                                //console.log("*******************" + value.style.display);
                                
                                if(value.id.length > 0){
                                            //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$: " + value.id);
                                        }
                                
                            if(langDocument[key]){
                                //console.log("---> (" + (lc) + ") " + langDocument['is-left-to-right']);
                                if(key == 'captcha'){
                                        $('select[id=captcha] option:first').html(langDocument[key]).attr("selected",true);
                                    }else if (key == "message"){
                                        value.placeholder = langDocument[key];
                                    }else if (key == "total"){
                                        labelTotal = langDocument[key];
                                    }else if (key == "state"){
                                        value.placeholder = langDocument[key];
                                    }else if (key == "shipping-offer"){
                                        

                                    }else{
                                        
                                    //e = measureString(langDocument[key]);
                                         //value.style.width = "300px";
                                    //if(e > value.clientWidth){
                                        
                                        //resizeText(langDocument[key],e,value.id);                                 
                                        //console.log(value.id + ": " + value.clientWidth);
                                        //console.log("font size: " + window.getComputedStyle(document.getElementById(value.id)).fontSize);
                                        //value.style.fontSize = "22px";
                                        //resizedFont = resizeText(langDocument[key],e,value.clientWidth);
                                        //value.style.width = "300px"; //value.clientWidth + 20 + "px";
                                        //value.style.fontSize = resizedFont;
                                        //console.log(resizedFont);
                                    //}
                                        
                                        if(value.id !== "you-have-number-of-items-in-cart"){
                                        value.placeholder = langDocument[key];
                                        //console.log("decodeEntities(langDocument[key]): " + decodeEntities(langDocument[key]));
                                        value.innerText =  decodeEntities(langDocument[key]);
                                        }
                                }
                            }
                                $('#language-picker').hide();
						});
                        //$(".nav-button").fitText(.1, { minFontSize: '8px', maxFontSize: '50px' });
                        //$().width(); 
                        //font: normal normal 25px/50px 'Comfortaa', cursive;
						$("#back-button-label").boxfit({align_center:true,align_middle:true});
						$("#next-button-label").boxfit({align_center:true,align_middle:true});
						$("#order-form-subheading-1").boxfit({align_center:true,maximum_font_size:35});
                        //Initialize total value 0
                    
                        
                    
                       
                        var formattedCurrency = formatCurrency(currencyCode,locale,0);		
                        $('#total').html(labelTotal + ": " + formattedCurrency);
                        //$('#review-order-price').html(labelTotal + ": " + formattedCurrency); 
                        
                        
   
				}
			);
	}



        
	function detectLanguage(override = false){
            console.log("detectLanguage(" + override + ")");
            
			var getlcParam = getLCfromQS();
            
			if(getlcParam.length > 0){
				languageCode = getlcParam;
                getLanguage(languageCode);
                return;
			}
        
        if(typeof override == "string"){
			languageCode = override;
            convert(currencyCode,"stripe"); 
			getLanguage(languageCode);
            
            return;
            
        }
            
		$.get("https://krane.tv/php/language.php", function (response) {

			//#############################################
			//#############################################
			//#############################################
			//Fallback languages
			//#############################################
			//#############################################
			//#############################################
			//TODO: possible MySQL/server-side solution?

			if(response == "mo"){
				response = "ro";
			}

			console.log("LANGUAGE CODE = " + response);
			//if(isDesbug().length > 0){response = isDesbug()};
			languageCode = response; 
            convert(currencyCode,"stripe"); 
			getLanguage(languageCode);
            

		});	

	}



function languageSearch(all = false){
        var qstring;
         qstring = all ? "" : $("#language-search").val();
        $.get("./php/language_dropdown_list.php", {qs: qstring}, function(result){
        if(result){
            z = document.getElementById('countries2');
            z.innerHTML = "";
            X = $.parseJSON(result);
             $.each(X, function(i, obj) {
                 $("#countries2").append("<li class = 'countryID' id = '" + obj.language_code + "'  onclick = \"getLanguage('" + obj.language_code + "');document.getElementById('language-label').innerHTML = '" + obj.language_name_translated + "';\">" + obj.language_name_translated + "</li>");
            })                 
        }
    })
    
}




function shippingLocationGetLanguage(countryCode){
    //get_shipping_country_in_native_language.php
        $.get("./php/get_shipping_country_in_native_language.php", {country_code: countryCode}, function(result){ 
            $("#country").val(result);
                

    })
}




















