//(function($) {

  //var isIE = /*@cc_on!@*/false || document.documentMode,
      //globalIdCounter = 0;

  //var blurText = function($spoiler, radius) {
    //var textShadow = "gray 0 0 " + radius + "px";
    //if (isIE) { textShadow = radius <= 0 ? "0 0 0 0 gray" : "0 0 " + radius + "px .1px gray"; }

    //$spoiler.css("background-color", "transparent")
            //.css("color", "rgba(0, 0, 0, 0)")
            //.css("text-shadow", textShadow);
  //};

  //var blurImage = function($spoiler, radius) {
    //// on the first pass, transform images into SVG
    //$("img", $spoiler).each(function(index, image) {
      //var transform = function() {
        //var w = image.width,
            //h = image.height,
            //id = ++globalIdCounter;
        //var svg = "<svg data-spoiler-id='" + id + "' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='" + w + "' height='" + h + "'>" +
                  //"<defs><filter id='blur-" + id + "'><feGaussianBlur id='gaussian-" + id + "' stdDeviation='" + radius + "'></feGaussianBlur></filter></defs>" +
                  //"<image xlink:href='" + image.src + "' filter='url(#blur-" + id + ")' width='" + w + "' height='" + h + "'></image>" +
                  //"</svg>";
        //$(image).replaceWith(svg);
      //};
      //// do we need to wait for the image to load?
      //if (image.naturalWidth === 0 || image.naturalHeight === 0) {
        //image.onload = transform;
      //} else {
        //transform();
      //}
    //});

    //// change the blur radius
    //$("svg", $spoiler).each(function(index, svg) {
      //var id = svg.getAttribute("data-spoiler-id");
      //svg.getElementById("gaussian-" + id).setAttribute("stdDeviation", radius);
    //});
  //};

  //var applySpoilers = function($spoiler, options, applyBlur) {
    //var maxBlur = options.max,
        //partialBlur = options.partial;

    //$spoiler.data("spoiler-state", "blurred");

    //applyBlur($spoiler, maxBlur);

    //$spoiler.on("mouseover", function() {
      //$spoiler.css("cursor", "pointer");
      //if ($spoiler.data("spoiler-state") === "blurred") { applyBlur($spoiler, partialBlur); }
    //}).on("mouseout", function() {
      //if ($spoiler.data("spoiler-state") === "blurred") { applyBlur($spoiler, maxBlur); }
    //}).on("click", function(e) {
      //if ($spoiler.data("spoiler-state") === "blurred") {
        //$spoiler.data("spoiler-state", "revealed").css("cursor", "auto");
        //applyBlur($spoiler, 0);
      //} else {
        //$spoiler.data("spoiler-state", "blurred").css("cursor", "pointer");
        //applyBlur($spoiler, partialBlur);
      //}
      //e.preventDefault();
    //});

  //};

  //$.fn.spoilText = function(options) {
    //var defaults = { max: 10, partial: 5 },
        //opts = $.extend(defaults, options || {});

    //return this.each(function() {
      //applySpoilers($(this), opts, blurText);
    //});
  //};

  //$.fn.spoilImage = function(options) {
    //var defaults = { max: 20, partial: 6 },
        //opts = $.extend(defaults, options || {});

    //return this.each(function() {
      //applySpoilers($(this), opts, blurImage);
    //});
  //};

//})(jQuery);

(function($){
    var validUidPrefixes = _([
         'an', 'bv', 'cp', 'da', 'dn', 'dq', 'ds', 'dt', 'ea', 'gf',
         'it', 'ja', 'kf', 'kn', 'kp', 'kv', 'ma', 'mn', 'ne', 'oa',
         'ot', 'pe', 'pf', 'pp', 'ps', 'pt', 'pv', 'sa', 'sf', 'sn',
         'tc', 'ud', 'uf', 'up', 'uv', 'vb', 'vv', 'ya', 'an1', 'an2',
         'an3', 'an4', 'an5', 'an6', 'an7', 'an8', 'an9', 'arv',
         'avs', 'cnd', 'dhp', 'ea1', 'ea2', 'ea3', 'ea4', 'ea5',
         'ea6', 'ea7', 'ea8', 'ea9', 'lal', 'mil', 'mnd', 'mvu',
         'sbv', 'sht', 'sn1', 'sn2', 'sn3', 'sn4', 'sn5', 'sn6',
         'sn7', 'sn8', 'sn9', 'snp', 'an10', 'an11', 'divy', 'ea-2',
         'ea10', 'ea11', 'ea12', 'ea13', 'ea14', 'ea15', 'ea16',
         'ea17', 'ea18', 'ea19', 'ea20', 'ea21', 'ea22', 'ea23',
         'ea24', 'ea25', 'ea26', 'ea27', 'ea28', 'ea29', 'ea30',
         'ea31', 'ea32', 'ea33', 'ea34', 'ea35', 'ea36', 'ea37',
         'ea38', 'ea39', 'ea40', 'ea41', 'ea42', 'ea43', 'ea44',
         'ea45', 'ea46', 'ea47', 'ea48', 'ea49', 'ea50', 'ea51',
         'ea52', 'sa-2', 'sa-3', 'sht1', 'sht2', 'sht3', 'sht4',
         'sht5', 'sht6', 'sht7', 'sht8', 'sht9', 'sn10', 'sn11',
         'sn12', 'sn13', 'sn14', 'sn15', 'sn16', 'sn17', 'sn18',
         'sn19', 'sn20', 'sn21', 'sn22', 'sn23', 'sn24', 'sn25',
         'sn26', 'sn27', 'sn28', 'sn29', 'sn30', 'sn31', 'sn32',
         'sn33', 'sn34', 'sn35', 'sn36', 'sn37', 'sn38', 'sn39',
         'sn40', 'sn41', 'sn42', 'sn43', 'sn44', 'sn45', 'sn46',
         'sn47', 'sn48', 'sn49', 'sn50', 'sn51', 'sn52', 'sn53',
         'sn54', 'sn55', 'sn56', 'thag', 'thig', 'bo-mu', 'dhatu',
         'gr-dg', 'gr-pm', 'jnana', 'lzh-d', 'lzh-k', 'lzh-m',
         'lzh-s', 'lzh-u', 'other', 'parip', 'pi-tv', 'prajn',
         'praka', 'sa1-1', 'sa100', 'sa101', 'sa110', 'sa120',
         'sa130', 'sa201', 'sa301', 'sa401', 'sa501', 'sa601',
         'sa701', 'sa801', 'sa901', 'sammi', 'sangi', 'sarip',
         'sht10', 'skt-b', 'skt-d', 'skt-j', 'skt-l', 'skt-m',
         'skt-s', 't102-', 't126-', 't150B', 't2-25', 't27-9',
         'tha-a', 'thi-a', 'vijna'
        ]).invert().value(),
        validLangs = _(['bo', 'ca', 'cs', 'de', 'en', 'es', 'fr',
                        'gr', 'hi', 'hu', 'id', 'it', 'ko', 'lzh',
                        'my', 'nl', 'no', 'oth', 'pi', 'pl', 'pt',
                        'ru', 'si', 'skt', 'sv', 'th', 'ug', 'vn', 'zh'
                        ]).invert().value(),
        uidRex = /(?:\/?([a-z]{2,3})\/)?\b(((?:t|[abcdegijklmnopstuvy][12abcdefhiknopqrstvz])[a-z-]*(?:-[1-9])?) ?([0-9.][a-z0-9.-]*))\b/gi;

    function markupUids($element) {
        if ($element.is('a')) return;
        
        var contents = $element.contents();

        contents.each(function(i, node){
            if (node.nodeType === 3) {
                var text = _.escape(node.nodeValue),
                    newText = text.replace(uidRex, function(m, lang, uid, divUid, num) {
                        uid = uid.replace(' ', '').toLowerCase();
                        divUid = divUid.toLowerCase();
                        
                        if (divUid.slice(0,5) in validUidPrefixes) {
                            if (num) {
                                if (lang) {
                                    lang = lang.toLowerCase();
                                    if (lang in validLangs) {
                                        return '<a target="_blank" class="sc-uid" href="http://suttacentral.net/' + lang + '/' + uid + '">' + m + '</a>'
                                    }
                                } else {
                                    return '<a target="_blank" class="sc-uid" href="http://suttacentral.net/' + uid + '">' + m + '</a>'
                                }
                            }
                        }
                        return m
                    });
                if (text == newText) return                
                var dummy = $('<span/>').html(newText),
                    parentNode = node.parentNode;
                dummy.each(function(i, newNode){
                    parentNode.insertBefore(newNode, node);
                });
                parentNode.removeChild(node);
            } else if (node.nodeType === 1) {
                markupUids($(node));
            }
        });
    }
    $.fn.scUids = function(options) {
        var defaults = {},
        opts = $.extend(defaults, options || {});
        return this.each(function() {
            markupUids($(this), opts);
        });
    };
})(jQuery);
