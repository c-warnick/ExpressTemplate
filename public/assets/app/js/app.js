'use strict';

+function ($, a) {
    //a is the window

    var $body = $('body');
    $body.addClass('edit');

    var overlay_text_align_options = ["text-left", "text-center", "text-right"];
    var overlay_sizing_options_mobile = ["grid_default-xs", "grid_1-1-xs", "grid_1-2-xs", "grid_1-3-xs", "grid_2-1-xs", "grid_2-2-xs", "grid_2-3-xs", "grid_3-1-xs", "grid_3-2-xs"];
    var overlay_sizing_options_desktop = ["grid_default-sm", "grid_1-1-sm", "grid_1-2-sm", "grid_1-3-sm", "grid_2-1-sm", "grid_2-2-sm", "grid_2-3-sm", "grid_3-1-sm", "grid_3-2-sm"];
    var overlay_alignment_options = ["", "__left", "__right", "__center", "__top", "__bottom", "__middle", "__top-left", "__top-center", "__top-right", "__middle-left", "__middle-center", "__middle-right", "__bottom-left", "__bottom-center", "__bottom-right"];
    var overlay_content_alignment_options_mobile = ["xs-centered-top", "xs-centered-middle", "xs-centered-bottom"];
    var overlay_content_alignment_options_desktop = ["sm-centered-top", "sm-centered-middle", "sm-centered-bottom"];
    var font_options = ["", "ff-cantataone", "ff-lato", "ff-lato_bold", "ff-lato_light", "ff-lato_black", "ff-playfair", "ff-playfair_bold", "ff-playfair_black", "ff-taviraj", "ff-taviraj_bold", "ff-taviraj_black", "ff-worksans", "ff-worksans_light", "ff-worksans_bold", "ff-abril"];
    var font_base_classes = ["cope-text-one", "cope-text-two", "cope-text-three"];
    var font_sizes_options = ["", "ff-62", "ff-42", "ff-36", "ff-28", "ff-17", "ff-15", "ff-14", "ff-12"];
    var font_color_options = ["", "white"];
    var font_scale_options = ["", "__scale-up", "__scale-down"];
    var cta_base_class = "cope-cta_button";
    var cta_type_options = ["", "0", "1"];
    var cta_standard_options = ["", "_white"];
    var cta_button_options = ["", "_white", "_blue", "_dark", "_stroke_blue"];
    var visual_nav_layout_options = ["cope-list_inline", "cope-list_block"];
    var visual_nav_count_options = ["2", "3", "4"];
    var visual_nav_cta_style_options = ["", "_white", "_blue", "_dark", "_stroke_blue"];
    var overlay_alignment_mappings = {
        "grid_default": ["__left", "__right", "__top", "__bottom", "__top-left", "__top-right", "__bottom-left", "__bottom-right"],
        "grid_1-1": ["__top-left", "__top-center", "__top-right", "__middle-left", "__middle-center", "__middle-right", "__bottom-left", "__bottom-center", "__bottom-right"],
        "grid_1-2": ["__top-left", "__top-right", "__middle-left", "__middle-right", "__bottom-left", "__bottom-right"],
        "grid_1-3": ["__top", "__middle", "__bottom"],
        "grid_2-1": ["__top-left", "__top-center", "__top-right", "__bottom-left", "__bottom-center", "__bottom-right"],
        "grid_2-2": ["__top-left", "__top-right", "__bottom-left", "__right"],
        "grid_2-3": ["__top", "__bottom"],
        "grid_3-1": ["__left", "__center", "__right"],
        "grid_3-2": ["__left", "__right"]
    };

    //Generic Selectors
    var inputs = "input,select,textarea";
    var triggers = $('.cope-group,[class*=cope-text-],.cope-cta,.cope-badge,.overlay,.cope-list');
    var control_panel = $('.control-panel');
    var cp_all_controls = control_panel.find('> form');
    var group_control = control_panel.find("#cope-group-controls");
    var font_control = control_panel.find("#font-controls");
    var cta_control = control_panel.find("#cta-controls");
    var badge_control = control_panel.find("#badge-controls");
    var overlay_control = control_panel.find("#overlay-controls");
    var visual_nav_control = control_panel.find("#visual-nav-controls");
    var visual_nav_cta_three = control_panel.find(".cta-three");
    var visual_nav_cta_four = control_panel.find(".cta-four");

    //Control Panel Input Groups
    //Cope Group Inputs
    var group_control_inputs = group_control.find(inputs);
    var group_header = $(group_control_inputs[0]);
    var group_header_text = $(group_control_inputs[1]);
    var group_nogut_vert = $(group_control_inputs[2]);
    var group_nogut_horz = $(group_control_inputs[3]);
    var group_hide_mobile = $(group_control_inputs[4]);

    //Font Control Inputs
    var font_control_inputs = font_control.find(inputs);
    var font_text = $(font_control_inputs[0]);
    var font_family = $(font_control_inputs[1]);
    var font_size = $(font_control_inputs[2]);
    var font_color = $(font_control_inputs[3]);
    var font_italics = $(font_control_inputs[4]);
    var font_uppercase = $(font_control_inputs[5]);
    var font_scale = $(font_control_inputs[6]);

    //CTA Control Inputs
    var cta_control_inputs = cta_control.find(inputs);
    var cta_type = $(cta_control_inputs[0]);
    var cta_standard_style = $(cta_control_inputs[1]);
    var cta_button_style = $(cta_control_inputs[2]);
    var cta_text = $(cta_control_inputs[3]);
    //Badge Control Inputs
    var badge_control_inputs = badge_control.find(inputs);
    var badge_text = $(badge_control_inputs[0]);
    var badge_color = $(badge_control_inputs[1]);

    //Overlay Conrtol Inputs
    var overlay_control_inputs = overlay_control.find(inputs);
    var overlay_text_align = $(overlay_control_inputs[0]);
    var size_mobile = $(overlay_control_inputs[1]);
    var size_desktop = $(overlay_control_inputs[2]);
    var alignment_mobile = $(overlay_control_inputs[3]);
    var no_fluid_mobile = $(overlay_control_inputs[4]);
    var fluid_mobile = $(overlay_control_inputs[5]);
    var alignment_desktop = $(overlay_control_inputs[6]);
    var no_fluid_desktop = $(overlay_control_inputs[7]);
    var fluid_desktop = $(overlay_control_inputs[8]);
    var not_fluid_desktop = $(overlay_control_inputs[9]);
    var content_align_mobile = $(overlay_control_inputs[10]);
    var content_align_desktop = $(overlay_control_inputs[11]);

    //Visual Nav Control Inputs
    var visual_nav_control_inputs = visual_nav_control.find(inputs);
    var visual_nav_layout = $(visual_nav_control_inputs[0]);
    var visual_nav_count = $(visual_nav_control_inputs[1]);
    var visual_nav_cta_style = $(visual_nav_control_inputs[2]);
    var visual_nav_cta_one_text = $(visual_nav_control_inputs[3]);
    var visual_nav_cta_two_text = $(visual_nav_control_inputs[4]);
    var visual_nav_cta_three_text = $(visual_nav_control_inputs[5]);
    var visual_nav_cta_four_text = $(visual_nav_control_inputs[6]);

    var target_id = void 0;
    var target = void 0;
    var target_header = void 0;

    //Setting form values
    function load_values(obj) {
        var target_classes = obj.attr('class');
        var target_classes_split = target_classes.split(/\s+/);
        var target_child_class = obj.children().attr('class');
        var target_child_class_split = void 0;

        if (target_child_class != "" && target_child_class != undefined) {
            target_child_class_split = target_child_class.split(/\s+/);
        };

        if (obj.hasClass('cope-group')) {
            var header = obj.find(".cope-header");
            var h2 = header.find('h2');
            if (header.length > 0) {
                if (h2.length > 0) {
                    group_header.val('text');
                    if (h2.text().length > 0) {
                        group_header_text.val(h2.text());
                    }
                } else {
                    group_header.val('icon');
                }
            } else {
                group_header.val('');
            }

            if (target.hasClass('no-gutters-vertical')) {
                group_nogut_vert.prop('checked', true);
            }

            if (target.hasClass('no-gutters-horizontal')) {
                group_nogut_horz.prop('checked', true);
            }

            if (target.hasClass('hidden-xs')) {
                group_hide_mobile.prop('checked', true);
            }
            group_control_inputs.trigger("change");
            return;
        }

        if (obj.hasClass('cope-text-one') || obj.hasClass('cope-text-two') || obj.hasClass('cope-text-three')) {

            font_text.val(obj.text());

            font_family.val(_.intersection(target_classes_split, font_options)[0]);

            font_size.val(_.intersection(target_classes_split, font_sizes_options)[0]);

            font_color.val(_.intersection(target_classes_split, font_color_options)[0]);

            if (target_classes_split.indexOf("ff-italic") > -1) {
                font_italics.prop('checked', true);
            }
            if (target_classes_split.indexOf("ff-uppercase") > -1) {
                font_uppercase.prop('checked', true);
            }

            var font_scale_match = target_classes.match(/(__scale-up|__scale-down)/);
            font_scale_match = font_scale_match != null ? font_scale_match[0] : "";

            font_scale.val(font_scale_match);

            font_control_inputs.trigger("change");
            return;
        }

        if (obj.hasClass('cope-cta')) {
            var type_match = target_classes.match(/(button|default)/);
            type_match = type_match != null ? type_match[0] : "";
            var standard_style_match = target_classes.match(/_white/);
            standard_style_match = standard_style_match != null ? standard_style_match[0] : "";
            var button_style_match = target_classes.match(/(_white|_blue|_dark|_stroke_blue)/);
            button_style_match = button_style_match != null ? button_style_match[0] : "";

            if (type_match == "button") {
                cta_type.val("1");
            } else if (type_match == "default") {
                cta_type.val("0");
            } else {
                cta_type.val("");
            }

            cta_standard_style.val(standard_style_match);
            cta_button_style.val(button_style_match);
            cta_text.val(obj.text());

            cta_control_inputs.trigger("change");
            return;
        }

        if (obj.hasClass('cope-badge')) {

            var obj_bkg_color = obj.css("background-color");

            badge_text.val(obj.html());
            if (target_classes.indexOf('ff-theme') > 0) {
                badge_color.val("theme");
            } else {
                if (obj_bkg_color.indexOf("#") > 0) {
                    badge_color.val(obj_bkg_color.split("#")[1]);
                } else {
                    badge_color.val(rgb2hex(obj_bkg_color));
                }
            }

            badge_control_inputs.trigger("change");
            return;
        }

        if (obj.hasClass('overlay')) {

            //Getting intersects

            var size_mobile_int = _.intersection(target_classes_split, overlay_sizing_options_mobile);
            var size_desktop_int = _.intersection(target_classes_split, overlay_sizing_options_desktop);
            var content_align_mobile_int = _.intersection(target_child_class_split, overlay_content_alignment_options_mobile);
            var content_align_desktop_int = _.intersection(target_child_class_split, overlay_content_alignment_options_desktop);

            overlay_text_align.val(_.intersection(target_classes_split, overlay_text_align_options)[0]);
            size_mobile.val(size_mobile_int.length > 0 ? size_mobile_int[0] : "grid_default-xs");
            size_desktop.val(size_desktop_int.length > 0 ? size_desktop_int[0] : size_mobile.val().replace('xs', 'sm'));

            var mobileAlignment = target_classes.match(/grid\S*xs__\S*/);
            mobileAlignment = mobileAlignment != null ? mobileAlignment[0].split("sm")[1] : "";
            alignment_mobile.val(mobileAlignment);

            if (target_classes_split.indexOf(/__fluid/) > -1) {
                fluid_mobile.prop("checked", true);
            } else if (target_classes_split.indexOf(/xs(.*)__not-fluid/) > -1) {
                not_fluid_mobile.prop("checked", true);
            }

            var desktopAlignment = target_classes.match(/grid\S*sm__\S*/);
            desktopAlignment = desktopAlignment != null ? desktopAlignment[0].split("sm")[1] : "";

            alignment_desktop.val(desktopAlignment);

            if (target_classes_split.indexOf(/sm(.*)__fluid/) > -1) {
                fluid_desktop.prop("checked", true);
            } else if (target_classes_split.indexOf(/sm(.*)__not-fluid/) > -1) {
                not_fluid_desktop.prop("checked", true);
            }

            content_align_mobile.val(content_align_mobile_int.length > 0 ? content_align_mobile_int[0] : "");
            content_align_desktop.val(content_align_desktop_int.length > 0 ? content_align_desktop_int[0] : "");

            overlay_control_inputs.trigger("change");
            return;
        }

        if (obj.hasClass('cope-list')) {
            var target_children = obj.find("a");

            var child_one = $(target_children[0]);
            var child_two = $(target_children[1]);
            var child_three = $(target_children[2]);
            var child_four = $(target_children[3]);

            target_child_class = target_children.attr("class");
            target_child_class_split = target_child_class.split(/\s/);

            var _button_style_match = target_child_class.match(/(_white|_blue|_dark|_stroke_blue)/);

            _button_style_match = _button_style_match != null ? _button_style_match[0] : "";

            visual_nav_layout.val(_.intersection(target_classes_split, visual_nav_layout_options)[0]);
            visual_nav_count.val(target_children.length);
            visual_nav_cta_style.val(_button_style_match);

            visual_nav_cta_one_text.val(child_one.text());
            visual_nav_cta_two_text.val(child_two.text());
            visual_nav_cta_three_text.val(child_three.text());
            visual_nav_cta_four_text.val(child_four.text());

            visual_nav_control_inputs.trigger("change");
            return;
        }

        return;
    }

    //Control Panel functionaliity
    group_control_inputs.on("change keyup", function () {
        target_header = target.find('.cope-header');
        if (group_header.val() != "") {
            target_header.show();
            if (group_header.val() == "text") {

                group_header_text.parent().show();
                target_header.html("<h2>" + group_header_text.val() + "</h2>");
            } else if (group_header.val() == "icon") {

                target_header.html("<i></i>");
                group_header_text.parent().hide();
            }
        } else {
            target_header.hide();
            group_header_text.parent().hide();
            index = 0;
        }
        //Checkbox no gutters vert
        if (group_nogut_vert.prop("checked") == true) {
            if (!target.hasClass(group_nogut_vert.val())) {
                target.addClass(group_nogut_vert.val());
            }
        } else {
            if (target.hasClass(group_nogut_vert.val())) {
                target.removeClass(group_nogut_vert.val());
            }
        }
        //Checkbox no gutters horz
        if (group_nogut_horz.prop("checked") == true) {
            if (!target.hasClass(group_nogut_horz.val())) {
                target.addClass(group_nogut_horz.val());
            }
        } else {
            if (target.hasClass(group_nogut_horz.val())) {
                target.removeClass(group_nogut_horz.val());
            }
        }
        //Check box hidden mobile
        if (group_hide_mobile.prop("checked") == true) {
            if (!target.hasClass(group_hide_mobile.val())) {
                target.addClass(group_hide_mobile.val());
            }
        } else {
            if (target.hasClass(group_hide_mobile.val())) {
                target.removeClass(group_hide_mobile.val());
            }
        }
    });

    font_control_inputs.on("change keyup", function () {

        var target_base_class = target.attr('class').split(/\s+/);
        var target_classes = target_base_class[0] + " selected";

        if (font_text.val() != "") {
            target.html(font_text.val());
        }

        if (font_family.val() != "") {

            target_classes += " " + font_family.val();
        }

        if (font_size.val() != "") {

            target_classes += " " + font_size.val();
        }

        if (font_color.val() != "") {

            target_classes += " " + font_color.val();
        }

        //Checkbox italics
        if (font_italics.prop("checked") == true) {
            target_classes += " " + font_italics.val();
        }

        //Checkbox italics
        if (font_uppercase.prop("checked") == true) {
            target_classes += " " + font_uppercase.val();
        }

        if (font_scale.val() != "") {
            target_classes += " " + font_size.val() + font_scale.val();
        }

        target.attr('class', target_classes);
    });

    cta_control_inputs.on("change keyup", function () {
        var target_classes = "selected cope-cta";
        var index = 0;
        var index_two = 0;

        if (cta_type.val() == "0") {
            cta_standard_style.parent().show();
            cta_button_style.parent().hide();
            target_classes += " cope-cta_default";
            if (cta_standard_style.val() != "") {
                target_classes += cta_standard_style.val();
            }
        } else if (cta_type.val() == "1") {
            cta_button_style.parent().show();
            cta_standard_style.parent().hide();
            target_classes += " cope-cta_button";
            if (cta_button_style.val() != "") {
                target_classes += cta_button_style.val();
            }
        } else {
            target.hide();
        }

        if (cta_text.val() != "") {
            target.text(cta_text.val());
        }
        target.attr('class', target_classes);
    });

    //TODO: Field for badge position
    badge_control_inputs.on("change keyup", function () {
        var index = 0;

        if (badge_text.val() != "") {
            if (index == 0) {
                target.show();
                index++;
            }
            target.html(badge_text.val());
        } else {
            target.hide();
            index = 0;
        }

        var badge_input_color = badge_color.val();

        if (badge_input_color != "") {
            if (badge_input_color == "theme") {
                target.addClass("ff-theme");
                target.attr('style', "");
            } else {
                if (badge_input_color.indexOf("rgb") > 0) {
                    if (badge_input_color.indexOf(")") > 6) {
                        target.css("background-color", badge_input_color);
                    }
                } else {

                    if (badge_input_color.length == 6) {
                        target.css("background-color", "#" + badge_input_color);
                    } else if (badge_input_color.length > 6) {
                        badge_color.val(badge_input_color.substring(0, 6));
                        target.css("background-color", "#" + badge_input_color);
                    }
                }

                target.removeClass("ff-theme");
            }
        } else {
            target.attr('style', "");
        }
    });

    overlay_control_inputs.on("change keyup", function () {
        alignment_mobile.find('option').prop('disabled', false);
        alignment_desktop.find('option').prop('disabled', false);

        var target_classes = "selected overlay";
        var target_child = target.find(".overlay-content");
        var target_child_classes = "overlay-content";

        target_classes += " " + overlay_text_align.val();

        target_classes += " " + size_mobile.val();
        if (text_trim(size_mobile.val(), 3) != text_trim(size_desktop.val(), 3)) {
            target_classes += " " + size_desktop.val();
        }

        var size_mobile_config = size_mobile.val().replace('-xs', '');
        var size_desktop_config = size_desktop.val().replace('-sm', '');

        var size_mobile_config_array = overlay_alignment_mappings[size_mobile_config];
        var size_desktop_config_array = overlay_alignment_mappings[size_desktop_config];

        var size_mobile_config_diff = _.difference(overlay_alignment_options, overlay_alignment_mappings[size_mobile_config]);
        var size_desktop_config_diff = _.difference(overlay_alignment_options, overlay_alignment_mappings[size_desktop_config]);

        var size_mobile_config_length = size_mobile_config_diff.length;
        var size_desktop_config_length = size_desktop_config_diff.length;

        for (var i = 0; i < size_mobile_config_length; i++) {
            if (size_mobile_config_diff[i] != "") {
                alignment_mobile.find('option[value=' + size_mobile_config_diff[i] + ']').prop('disabled', true);

                if (overlay_alignment_mappings[size_mobile_config].indexOf(alignment_mobile.val()) < 0) {
                    alignment_mobile.find('option[value=' + overlay_alignment_mappings[size_mobile_config][0] + ']').prop('selected', true);
                }
            }
        }
        for (var i = 0; i < size_desktop_config_length; i++) {
            if (size_desktop_config_diff[i] != "") {
                alignment_desktop.find('option[value=' + size_desktop_config_diff[i] + ']').prop('disabled', true);

                if (overlay_alignment_mappings[size_desktop_config].indexOf(alignment_desktop.val()) < 0) {
                    alignment_desktop.find('option[value=' + overlay_alignment_mappings[size_desktop_config][0] + ']').prop('selected', true);
                }
            }
        }

        target_classes += " " + size_mobile.val() + alignment_mobile.val();
        if (alignment_desktop.val() != "" && alignment_mobile.val() != alignment_desktop.val()) {
            target_classes += " " + size_desktop.val() + alignment_desktop.val();
        }

        alignment_mobile.val() != "" ? fluid_mobile.parents('.form-group').show() : fluid_mobile.parents('.form-group').hide();
        alignment_desktop.val() != "" ? fluid_desktop.parents('.form-group').show() : fluid_desktop.parents('.form-group').hide();

        if (fluid_mobile.prop("checked") == true) {

            target_classes += " " + size_mobile.val() + alignment_mobile.val() + fluid_mobile.val();
        }

        if (fluid_desktop.prop("checked") == true) {

            target_classes += " " + size_desktop.val() + alignment_desktop.val() + fluid_desktop.val();
        } else if (not_fluid_desktop.prop("checked") == true) {

            target_classes += " " + size_desktop.val() + alignment_desktop.val() + not_fluid_desktop.val();
        }

        target_child_classes += " " + content_align_mobile.val();
        if (content_align_mobile.val() != content_align_desktop.val()) {
            target_child_classes += " " + content_align_desktop.val();
        }

        target.attr("class", target_classes);
        target_child.attr("class", target_child_classes);
    });
    //TODO: Add count to bottom list

    visual_nav_control_inputs.on("change keyup", function () {
        var target_classes = "selected cope-list cope-list_inner";
        var target_children = target.find('a');
        var target_children_classes = "cope-list__item";
        var nav_layout = visual_nav_layout.val();
        var nav_count = visual_nav_count.val();
        var nav_html = '';
        var nav_count_four = visual_nav_count.find('option:eq(2)');

        if (nav_layout == "cope-list_inline") {
            nav_count_four.prop('disabled', true);
        } else {
            nav_count_four.prop('disabled', false);
        }

        target_classes += " " + nav_layout;

        if (target_children.length != nav_count) {
            if (nav_count < 4) {
                for (i = 0; i < nav_count; i++) {
                    nav_html += '<a href="#" title="enter title here" class="cope-list__item">Enter Text</a>';
                }

                target.html(nav_html);
            } else if (nav_count >= 4 && nav_layout != 'cope-list_inline') {
                for (i = 0; i < 2; i++) {
                    nav_html += '<div class="cope-list__row">';
                    for (j = 0; j < 2; j++) {
                        nav_html += '<a href="#" title="enter title here" class="cope-list__item">Enter Text</a>';
                    }
                    nav_html += '</div>';
                }

                target.html(nav_html);
            }
        }

        if (nav_count >= 4) {
            target_classes += " cope-list_four";
        }

        var nav_ctas = target.find('a');

        target_children_classes += " " + cta_base_class + visual_nav_cta_style.val();

        var nav_cta_one = $(nav_ctas[0]);
        var nav_cta_two = $(nav_ctas[1]);
        var nav_cta_three = $(nav_ctas[2]);
        var nav_cta_four = $(nav_ctas[3]);

        // Show CTA Field Three
        if (nav_cta_three.length > 0) {
            visual_nav_cta_three_text.parent().show();
        } else {
            visual_nav_cta_three_text.parent().hide();
        }

        // Show CTA Field Four
        if (nav_cta_four.length > 0) {
            visual_nav_cta_four_text.parent().show();
        } else {
            visual_nav_cta_four_text.parent().hide();
        }

        if (visual_nav_cta_one_text.val() != "") {
            nav_cta_one.text(visual_nav_cta_one_text.val());
        }
        if (visual_nav_cta_two_text.val() != "") {
            nav_cta_two.text(visual_nav_cta_two_text.val());
        }
        if (visual_nav_cta_three_text.val() != "") {
            nav_cta_three.text(visual_nav_cta_three_text.val());
        }
        if (visual_nav_cta_four_text.val() != "") {
            nav_cta_four.text(visual_nav_cta_four_text.val());
        }

        target.attr("class", target_classes);
        nav_ctas.attr("class", target_children_classes);
    });

    //Trigger Functions
    if (triggers.length > 0) {
        triggers.each(function (index) {
            var $this = $(this);
            var uuid = guid();

            $this.attr('id', uuid);
        });

        triggers.hover(function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).addClass('pre-select');
        }, function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).removeClass('pre-select');
        });

        triggers.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var $this = $(this),
                parent = $this.parents('.cope-group');

            triggers.removeClass('selected');
            $this.addClass('selected');

            var obj = $('.selected');

            if (obj.hasClass('cope-group')) {
                cp_all_controls.removeClass("active");
                group_control.addClass("active").attr("data-uuid", obj.attr("id"));

                target_id = obj.attr("id");
                target = $("#" + target_id);

                load_values(obj);
                return;
            }
            if (obj.hasClass('cope-text-one') || obj.hasClass('cope-text-two') || obj.hasClass('cope-text-three')) {
                cp_all_controls.removeClass("active");
                font_control.addClass("active").attr("data-uuid", obj.attr("id"));

                target_id = obj.attr("id");
                target = $("#" + target_id);
                load_values(obj);
                return;
            }
            if (obj.hasClass('cope-cta')) {
                cp_all_controls.removeClass("active");
                cta_control.addClass("active").attr("data-uuid", obj.attr("id"));

                target_id = obj.attr("id");
                target = $("#" + target_id);
                load_values(obj);

                return;
            }
            if (obj.hasClass('cope-badge')) {
                cp_all_controls.removeClass("active");
                badge_control.addClass("active").attr("data-uuid", obj.attr("id"));

                target_id = obj.attr("id");
                target = $("#" + target_id);
                load_values(obj);

                return;
            }
            if (obj.hasClass('overlay')) {
                cp_all_controls.removeClass("active");
                overlay_control.addClass("active").attr("data-uuid", obj.attr("id"));

                target_id = obj.attr("id");
                target = $("#" + target_id);
                load_values(obj);

                return;
            }

            if (obj.hasClass('cope-list')) {
                cp_all_controls.removeClass("active");
                visual_nav_control.addClass("active").attr("data-uuid", obj.attr("id"));

                target_id = obj.attr("id");
                target = $("#" + target_id);
                load_values(obj);

                return;
            }

            return;
        });
    }

    $(a).on("keydown", function (e) {
        if (e.which == 46) {
            target.remove();
        }
    });

    // Create Guid Function
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    //trim function
    function text_trim(text, char, position) {
        position = position || 'right';
        text = text || "";
        char = char || console.error('Missing number parameter for text_trim function');
        var text_length = text.length;

        if (position == 'left') {
            text = text.substring(0, text_length - char);
            return text;
        } else if (position == 'right') {
            text = text.substring(0, text_length - char);
            return text;
        }
    }

    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    //Function to convert hex format to a rgb color
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    if (typeof Modernizr != 'undefined') {
        if (Modernizr.svg) {} else {
            var svgs = $('img[src*=.svg]');
            var svgs_attr = svgs.attr("src");

            svgs.attr("src", svgs_attr.replace('.svg', '.png'));
        }
    }
}(jQuery, window);
//# sourceMappingURL=app.js.map
