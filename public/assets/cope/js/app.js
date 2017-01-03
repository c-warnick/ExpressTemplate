/********* DOM Builder For Belk Cope ***********/
var comment, components, content, positions, target, selection, renders,output = "";
renders = ["default","centered","fluid"];
content = "<div class=\"overlay\">"
+             "<div class=\"overlay-content margin-sm\">"
+               "<div><span class=\"indent\" style=\"font-size:1em;line-height:1em;\">starting at</span></div>"
+                 "<div class=\"inline\">"
+                  "<div class=\"text-left\">"
+                      "<span class=\"bold kern-down-5\" style=\"font-size: 6em;line-height: .7em;\">25</span>"
+                  "</div>"
+                  "<span style=\"font-size: 3em;line-height: .7em;\" class=\"bold cent\">99</span>"
+                "</div>"
+            "</div>"
+          "</div>";

target = $("#container");

components = {
	"fullhero" : {
		"name" : "Full Hero",
		"gels" : 1,
		"html" : "<div class=\"cope-group row\">"
        +"<!-- Promo A -->"
        +"<div class=\"col-md-24\">"
        +  "<a href=\"#\">"
        +    "<img src=\"../img/ph-fullhero.png\">"
        +    "</a>"
        +  "</div>"
      	+"</div>"
	}
		"2col" : {
		"name" : "2 Col",
		"gels" : 2,
		"html" :     "<div class=\"cope-group row\">"
					+    "<!-- Promo A -->"
					+     "<div class=\"col-xs-12\">"
					+        "<a href=\"#\">"
					+           "<img src=\"http://placehold.it/452x250/eeeeee?text=2A\">"
					+        "</a>"
					+     "</div>"
					+  	"<!-- Promo B -->"
					+ 	"<div class=\"col-xs-12 mw_hide\">"
					+  		"<a href=\"#\">"
					+    	 "<img src=\"http://placehold.it/452x250/eeeeee?text=2B\">"
					+		"</a>"
					+	"</div>"
					+"</div>"
	}
}

selection = [
                ['default',[['default',0],
                    ['top-left',1],
                    ['top-right',3],
                    ['bottom-left',7],
                    ['bottom-right',9],
                    ['top',11],
                    ['bottom',13],
                    ['left',15],
                    ['right',16]
                                ]],
                ['grid-1-1',[['top-left',0],
                            ['top-center',2],
                            ['top-right',3],
                            ['middle-left',4],
                            ['middle-right',6],
                            ['bottom-left',7],
                            ['bottom-center',8],
                            ['bottom-right',9]
                                    ]],
                ['grid-1-2',[['top-left',0],
                            ['top-right',3],
                            ['middle-left',4],
                            ['middle-right',6],
                            ['bottom-left',7],
                            ['bottom-right',9]
                                    ]],
                ['grid-1-3',[['top',0],
                            ['middle',12],
                            ['bottom',13]
                                    ]],
                ['grid-2-1',[['top-left',0],
                            ['top-center',2],
                            ['top-right',3],
                            ['bottom-left',7],
                            ['bottom-center',8],
                            ['bottom-right',9]
                                    ]],
                ['grid-2-2',[['top-left',0],
                            ['top-right',3],
                            ['bottom-left',7],
                            ['bottom-right',9]
                                    ]],
                ['grid-2-3',[['top',0],
                             ['bottom',13]
                                    ]],
                ['grid-3-1',[['left',0],
                            ['center',14],
                            ['right',16]
                                    ]], 
                ['grid-3-2',[['left',0],
                            ['right',16]
                            ]]
                
            ],

comment = "<!-- ********** FW - component - Overlay - configuration ********** -->"

function getConfiguration(selection){
	selection = selection || "Hello Configuration"
	return selection;
}

function createComment(component, configuration){
	component = component || "Hello Comment";
	configuration = configuration || "";
	var value = comment.replace("component",component).replace("configuration",getConfiguration(configuration));
	return value;
}


function renderCope(component){
	component = component || null;
	if(component == null){
		console.error("Component not specific.  Function failed to execute");
		return;
	}

    console.log($html);
	// loop through selections
	for(var i = 0; i < selection.length; i++){
		for(var j = 0; j < selection[i][1].length; j++){
			var name = components[component]["name"],
			html = components[component]["html"],
			$html = $(html),
			componentClone = $html.clone();

			var configuration = "";
			if(selection[i][0].indexOf("grid") != -1)(
				configuration += "Grid 9 - "
			)

			configuration += selection[i][1][j][0].replace("-"," ");
			output += createComment(name,configuration).toUpperCase();
			output += componentClone.get(0).outerHTML;

	    }
	}
	target.html(output);
}


renderCope("fullhero");



