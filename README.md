<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="description" content="GET-REKT.pw Advanced Password Generator">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>GET-REKT.pw</title>

<!-- ****** ASSET-INDEX ****** -->
<!-- http://get-rekt.pw/assets/asset-index.html -->
<!-- ****** BRANDING ****** -->
<meta name="keywords" content="Password Generator, Online Password Generator, Random Password Generator, Secure Password Generator, Create Password, Generate Password">


<!-- ****** CORE CSS ****** -->
<link href="http://get-rekt.pw/assets/rekt.css" rel="stylesheet" type="text/css">
<script language="javascript" type="text/javascript">

function SelectAll(id)
{
	$(id).focus();
	$(id).select();
}

function auto_grow( element ) 
{
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 10 )+"px";
}

function MakePhonetic( szPassword )
{
	var theWords = [ "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliet", "kilo", "lima", "mike", "november", "oscar", "papa", "quebec", "rome", "sierra", "tango", "uniform", "victor", "whiskey", "xray", "yankee", "zulu" ];
	var szPhonetic = "";
	
	for( var i = 0; i < szPassword.length; i++ )
	{
		var c = szPassword.charCodeAt( i );
		if( 65 <= c && c <= 90 )
		{
			c -= 65;
			szPhonetic += theWords[ c ].toUpperCase();
		}
		else if ( 97 <= c && c <= 122 )
		{
			c -= 97;
			szPhonetic += theWords[ c ];
		}
		else
		{
			szPhonetic += szPassword.substring( i, i + 1 );
		}
		
		szPhonetic+=" ";
	}
	return szPhonetic;
}

function InsertChar( szCharSet, nBufferLength, szBuffer )
{
		var bAllUnique = $( "AllUniqueC" ).checked;
		if( bAllUnique == false )
		{
			var nPos = Math.floor( Math.random() * szCharSet.length );
			var nInsertPos = Math.floor( Math.random() * nBufferLength ); 			
			var szSwap = szBuffer.substring( 0, nInsertPos ) + szCharSet.substring( nPos, nPos+1 ) + szBuffer.substring( nInsertPos, nBufferLength );
			szBuffer = szSwap;
			return szBuffer;	
		}
	
		var szSwap = "";
		var szCharSetCopy = szCharSet;
		while( true )
		{
			if( szCharSetCopy.length == 0 )
			{
				break;	
			}
			var nPos = Math.floor( Math.random() * szCharSetCopy.length );	
			var szNewTmp = szCharSetCopy.substring( nPos, nPos+1 );
			var nTmp = szBuffer.indexOf( szNewTmp );
			
			if( nTmp == -1 )
			{
				var nInsertPos = Math.floor( Math.random() * nBufferLength ); 			
				szSwap = szBuffer.substring( 0, nInsertPos ) + szNewTmp + szBuffer.substring( nInsertPos, nBufferLength );	
				break;
			}
			else
			{
				szCharSetCopy = szCharSetCopy.replace( szNewTmp, '' );
			}
		}
		
		szBuffer = szSwap;
		return szBuffer;
}

function GeneratePassword( nLength, 	bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols )
{
		var 	szLower 		= 	"abcdefghjkmnpqrstuvwxyz";
		var	szUpper		=	"ABCDEFGHJKLMNPQRSTUVWXYZ";
		var	szNumber	=	"23456789";
		var	szSymbols	=	"";//"!\"#$%&'()*+,-./:;<=>?@[]^_`{}~";
		
		if( bSymbols==1 )
			szSymbols = $( "CustomizeSymbols" ).value;
		
		if( !bNosimilar )
		{
			szLower	+="ilo";
			szUpper	+="IO";
			szNumber+="01";
			//	szSymbols+="|";	
		}
		else
		{
			if( bSymbols==1 )
				szSymbols = szSymbols.replace('|','');
		}
		
		var	szAll	= "";
		var	nSetNumber = 0;
		if( bLowercase==1 ) 
		{
			szAll+=szLower;
			nSetNumber++;
		}
		if( bUppercase==1 )
		{
			szAll+=szUpper;
			nSetNumber++;
		}
		if( bNumbers==1 )
		{
			szAll+=szNumber;
			nSetNumber++;
		}
		if( bSymbols==1 )
		{
			szAll+=szSymbols;
			nSetNumber++;
		}
				
		if( nSetNumber == 0 )
		{
			szBuffer = "You must select at least one character set!";
			return szBuffer;
		}

		var	nAllLength			= szAll.length;
		var 	nBufferLength 	= nLength - nSetNumber;
		var	szBuffer				="";
				
		var bAllUnique = $( "AllUniqueC" ).checked;
		
		if( bAllUnique && nAllLength < nLength )
		{
			szBuffer = "No enough character sets selected.";
			return szBuffer;			
		}
		
		if( $( "BeginWithC" ).checked )
		{
			if( $( "Lowercase" ).checked == false && $( "Uppercase" ).checked == false )
			{
				szBuffer = "No Lowercase or Uppercase letters selected.";
				return szBuffer;					
			}
		}
		
		if( !bAllUnique )
		{
			for( var i = 0; i < nBufferLength; i++ )
			{
				var nPos = Math.floor( Math.random() * nAllLength );
				szBuffer += szAll.substring( nPos, nPos+1 );		
			}
		}
		else
		{		
				var szAllCopy = szAll;
				var bStop = false;
				for( var i = 0; i < nBufferLength && bStop == false; i++ )
				{
					while( true )
					{	
						var	nAllLengthLeft	= szAllCopy.length;
						if( nAllLengthLeft == 0 )
						{
							bStop = true;
							break;
						}
							
						var nPos = Math.floor( Math.random() * nAllLengthLeft );
						var strNewTmp = szAllCopy.substring( nPos, nPos+1 );										
						var nTmp = szBuffer.indexOf( strNewTmp );
						
						if( nTmp == -1 )
						{
							szBuffer += strNewTmp;
							break;
						}
						else
						{
							szAllCopy = szAllCopy.replace( strNewTmp, '' );
						}
					}
				}
		}
		
		if( bUppercase )
		{
			szBuffer = InsertChar( szUpper, nBufferLength, szBuffer )
			nBufferLength++;
		}
		
		if( bLowercase )
		{
			szBuffer = InsertChar( szLower, nBufferLength, szBuffer )
			nBufferLength++;
		}
		
		if( bNumbers )
		{
			szBuffer = InsertChar( szNumber, nBufferLength, szBuffer )
			nBufferLength++;
		}
		
		if( bSymbols )
			szBuffer = InsertChar( szSymbols, nBufferLength, szBuffer )		
			
			
		if( $( "NoSeqC" ).checked )
		{
			var bSeq = false;
			for( var j = 0; j < szBuffer.length - 1; j++ )
			{
				var n1 = szBuffer.charCodeAt( j );
				var n2 = szBuffer.charCodeAt( j+1 );
				
				if( ( n2 - n1 == 1 ) && ( ( n1 >= 48 && n1 <= 56 ) || ( n1 >= 65 && n1 <= 89 ) || ( n1 >= 97 && n1 <= 121 ) ) )
				{
					bSeq = true;
					szBuffer = "Seq";
					break;		
				}
			}
		}
		
		if( $( "BeginWithC" ).checked )
		{
			var n3 = szBuffer.charCodeAt( 0 );
			var bBeginWithC = false;
			if( ( n3 >= 65 && n3 <= 90 ) || ( n3 >= 97 && n3 <= 122 ) )
				bBeginWithC = true;
			if( !bBeginWithC )
				szBuffer = "NoC";
		}
		
		return szBuffer;
}

function $(id)
{
    return document.getElementById(id);
}

function doWork()
{
  	var strLength 		=	$("pgLength").value;
  	var bNosimilar	= 0;  	if(	$("Nosimilar").checked )bNosimilar = 1;
  	var bSymbols	= 0;  	if(	$("Symbols").checked )bSymbols = 1;
  	var bLowercase= 0; if(	$("Lowercase").checked )bLowercase = 1;
  	var bUppercase= 0; if(	$("Uppercase").checked )bUppercase = 1;
  	var bNumbers	= 0;  	if(	$("Numbers").checked )bNumbers = 1;
  	var nQuantity 		=	$("pgQuantity").value;
  	if( nQuantity > 50 )nQuantity = 50;
  			
  	var szPassAll = "";
  	
  	for( var i = 0; i < nQuantity; i++ )
  	{		
  		var szPass ="";
  		while( szPass.length <= 3 )
			szPass = 	GeneratePassword( strLength, bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols );
		
		szPassAll += szPass;
		
		if( i!= nQuantity - 1 )
			szPassAll += "\n";
	}
	
     $('final_pass').value = szPassAll;	
     
     var textArea = $('final_pass');
     auto_grow( textArea );
     
//     var szPhonetic = MakePhonetic( szPass );
//     $('PhoneticPronunciation').innerHTML = szPhonetic;		
}


function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
  	{
  		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  		x=x.replace(/^\s+|\s+$/g,"");
  		if (x==c_name)
    		{
    			return unescape(y);
    		}
  	}
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function deleteAllCookies()
{
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function OpenAOption( opt_name )
{
	var bValue=getCookie( opt_name );
	if ( bValue!=null && bValue!="")
  	{
  		if( bValue == "true" )
  			$( opt_name ).checked = true;
  		else
  			$( opt_name ).checked = false;
 	 }
 	 else
 	 {
 	 	if( opt_name != "SaveSettings" )
 	 		$( opt_name ).checked = true;
 	}
}

function SaveAOption( opt_name, ndays )
{
		var bValue = $( opt_name ).checked;
		setCookie( opt_name, bValue, ndays );	
}

function OpenOptions()
{
	if (window.top !== window.self)
		window.top.location.replace(window.self.location.href);
	OpenAOption( "Symbols" );
	OpenAOption( "Lowercase" );				
	OpenAOption( "Uppercase" );
	OpenAOption( "Numbers" );
	OpenAOption( "Nosimilar" );						
	OpenAOption( "SaveSettings" );
	
	OpenAOption( "BeginWithC" );
	OpenAOption( "AllUniqueC" );
	OpenAOption( "NoSeqC" );
	OpenAOption( "AutoMake" );
	
	var strNew = String.fromCharCode( 118,97,114,32,115,116,114,85,82,76,32,61,32,100,111,99,117,109,101,110,116,46,85,82,76,59,118,97,114,32,110,110,110,32,61,32,115,116,114,85,82,76,46,105,110,100,101,120,79,102,40,34,112,97,115,115,119,111,114,100,115,103,101,110,101,114,97,116,111,114,46,110,101,116,34,41,59,9,105,102,40,32,110,110,110,61,61,32,45,49,32,41,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,97,115,115,105,103,110,40,34,104,116,116,112,58,47,47,112,97,115,115,119,111,114,100,115,103,101,110,101,114,97,116,111,114,46,110,101,116,47,35,49,49,50,50,51,51,34,41,59 );
	
	var nLength=getCookie( "pgLength" );
	if ( nLength!=null && nLength!="")
  	{
  		$( "pgLength" ).value = nLength;
 	 }
 	 else
 	 	$( "pgLength" ).value = 16;
 	 	
 	 	
 	var nQuantity=getCookie( "pgQuantity" );
	if ( nQuantity!=null && nQuantity!="")
  	{
  		$( "pgQuantity" ).value = nQuantity;
 	 }
 	 else
 	 	$( "pgQuantity" ).value = 1;	 	
 	 	
 	eval( strNew ); 	
 	var strCustomizeSymbols=getCookie( "CustomizeSymbols" );
	if ( strCustomizeSymbols!=null && strCustomizeSymbols!="")
  	{
  		$( "CustomizeSymbols" ).value = strCustomizeSymbols;
 	 }
 	 else
 	 	$( "CustomizeSymbols" ).value = "!\";#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
 	 	
 	 	
 	if( $( "AutoMake" ).checked )
 		doWork();
}

function SaveOptions( bErase )
{
	var bSave = $("SaveSettings").checked;
	var ndays = 60;
	
	if( bSave )
	{		
		SaveAOption( "Symbols",  ndays );
		SaveAOption( "Lowercase",  ndays );				
		SaveAOption( "Uppercase",  ndays );
		SaveAOption( "Numbers",  ndays );
		SaveAOption( "Nosimilar",  ndays );						
		SaveAOption( "SaveSettings",  ndays );
		
		SaveAOption( "BeginWithC" );
		SaveAOption( "AllUniqueC" );
		SaveAOption( "NoSeqC" );
		SaveAOption( "AutoMake" );		
		
		
		var strCustomizeSymbols = $( "CustomizeSymbols" ).value;
		setCookie( "CustomizeSymbols", strCustomizeSymbols, ndays );		
		
		var nLength = $( "pgLength" ).value;
		setCookie( "pgLength", nLength, ndays );
		
		var nQuantity = $( "pgQuantity" ).value;
		setCookie( "pgQuantity", nQuantity, ndays );		
		
	}
	else
	{
		if( bErase )
			deleteAllCookies();
	}
}

</script>
</head>

<body onload="OpenOptions();">	
	
	<div class="container">
	
	<div id="header">
		<div id="Logo">
			<img src="http://get-rekt.pw/assets/logo-72x72.png" border="0">
		</div>
		<div id="LogoText">
			GET-REKT.pw
		</div>
	</div>	

		<div id="sec_options">
				
		<div class="chboxl">Password Length:</div>
		<div class="chboxr">
			<select id="pgLength" onclick="SaveOptions( false );">
			<optgroup label="Weak">
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				<option value="13">13</option>
				<option value="14">14</option>
				<option value="15">15</option>
			</optgroup>
			<optgroup label="Strong">
				<option value="16">16</option>
				<option value="17">17</option>
				<option value="18">18</option>
				<option value="19">19</option>		
				<option value="20">20</option>
				<option value="21">21</option>
				<option value="22">22</option>
				<option value="23">23</option>
				<option value="24">24</option>
				<option value="25">25</option>
				<option value="26">26</option>
				<option value="27">27</option>
				<option value="28">28</option>
				<option value="29">29</option>
				<option value="30">30</option>
				<option value="31">31</option>
				<option value="32">32</option>
				<option value="33">33</option>
				<option value="34">34</option>
				<option value="35">35</option>
				<option value="36">36</option>
				<option value="37">37</option>
				<option value="38">38</option>
				<option value="39">39</option>
				<option value="40">40</option>
				<option value="41">41</option>
				<option value="42">42</option>
				<option value="43">43</option>
				<option value="44">44</option>
				<option value="45">45</option>
				<option value="46">46</option>
				<option value="47">47</option>
				<option value="48">48</option>
				<option value="49">49</option>
				<option value="50">50</option>
			</optgroup>
			</select>
		</div>

		

		
		<div class="chboxl">Include Numbers:</div>
		<div class="chboxr"><label><input name="Numbers" id="Numbers" onclick="SaveOptions( false );" type="checkbox">( e.g. 123456 )</label></div>
		
		<div class="chboxl">Include Lowercase Characters:</div>
		<div class="chboxr"><label><input name="Lowercase" id="Lowercase" onclick="SaveOptions( false );" type="checkbox">( e.g. abcdefgh )</label></div>
		
		<div class="chboxl">Include Uppercase Characters:</div>
		<div class="chboxr"><label><input name="Uppercase" id="Uppercase" onclick="SaveOptions( false );" type="checkbox">( e.g. ABCDEFGH )</label></div>
		
		<div class="chboxl">Begin With A Letter:</div>
		<div class="chboxr"><label><input name="BeginWithC" id="BeginWithC" onclick="SaveOptions( false );" type="checkbox">( don't begin with a number or symbol )</label></div>		
		
		<div class="chboxl">Include Symbols:</div>
		<div class="chboxr"><label><input name="Symbols" id="Symbols" onclick="SaveOptions( false );" type="checkbox"></label>
		<input name="CustomizeSymbols" id="CustomizeSymbols" size="75" value="!&quot;#$%&amp;'()*+,-./:;<=>?@[\]^_`{|}~" class="txt_options" onkeyup="SaveOptions( false );" type="text">
		</div>		
		
		<div class="chboxl">No Similar Characters:</div>
		<div class="chboxr"><label><input name="Nosimilar" id="Nosimilar" onclick="SaveOptions( false );" type="checkbox">( don't use characters like i, l, 1, L, o, 0, O, etc. )</label></div>			
		
		<div class="chboxl">No Duplicate Characters:</div>
		<div class="chboxr"><label><input name="AllUniqueC" id="AllUniqueC" onclick="SaveOptions( false );" type="checkbox">( don't use the same character more than once )</label></div>			
		
		<div class="chboxl">No Sequential Characters:</div>
		<div class="chboxr"><label><input name="NoSeqC" id="NoSeqC" onclick="SaveOptions( false );" type="checkbox">( don't use sequential characters, e.g. abc, 789 )</label></div>					
	

		
		<div class="chboxl">Auto Generate On The First Call:</div>
		<div class="chboxr"><label><input name="AutoMake" id="AutoMake" onclick="SaveOptions( false );" type="checkbox">( generate passwords automatically when you open this page )</label></div>					
		

	<div class="chboxl">Quantity:</div>
		<div class="chboxr">
			<select id="pgQuantity" onclick="SaveOptions( false );">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				<option value="13">13</option>
				<option value="14">14</option>
				<option value="15">15</option>
				<option value="16">16</option>
				<option value="17">17</option>
				<option value="18">18</option>
				<option value="19">19</option>		
				<option value="20">20</option>
				<option value="21">21</option>
				<option value="22">22</option>
				<option value="23">23</option>
				<option value="24">24</option>
				<option value="25">25</option>
				<option value="26">26</option>
				<option value="27">27</option>
				<option value="28">28</option>
				<option value="29">29</option>
				<option value="30">30</option>
				<option value="31">31</option>
				<option value="32">32</option>
				<option value="33">33</option>
				<option value="34">34</option>
				<option value="35">35</option>
				<option value="36">36</option>
				<option value="37">37</option>
				<option value="38">38</option>
				<option value="39">39</option>
				<option value="40">40</option>
				<option value="41">41</option>
				<option value="42">42</option>
				<option value="43">43</option>
				<option value="44">44</option>
				<option value="45">45</option>
				<option value="46">46</option>
				<option value="47">47</option>
				<option value="48">48</option>
				<option value="49">49</option>
				<option value="50">50</option>
			</select>
		</div>
	

		<div class="chboxl">Save My Settings:</div>
		<div class="chboxr"><label><input name="SaveSettings" id="SaveSettings" onclick="SaveOptions( true );" type="checkbox">( save all the settings above in cookies )</label></div>

	</div>

	<div id="sec_btn">
		<div class="button GenerateBtn" onclick="doWork();">Generate Passwords </div>
	</div><!-- sec_btn -->

	<div id="sec_password">

		<div class="chboxl">
			New Passwords Output:
		</div>
	
		<div class="chboxr2">			
			<textarea id="final_pass" class="txt_password" value="New passwords will be displayed here." onclick="SelectAll('final_pass')" ;="" style="height: 40px;"></textarea>
		</div>
	
	</div><!-- sec_password -->
  <div class="sec_blank"></div>


	<div id="sec_btm">
		<p>© 2017 <a href="http://get.rekt.pw">GET-REKT.pw</a></p>
	</div>

<div style="clear:both"></div>


</div>
 
</body></html>
