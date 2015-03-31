(function($){
    "use strict";
    
    var SCBaseUrl = 'http://suttacentral.net';
    if (window.location.origin.match(/^http:\/\/localhost/)) {
        SCBaseUrl = 'http://localhost'
    }
    
    

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
                                        return '<span class="sc-uid" data-lang="'+lang+'" data-uid="'+uid+'">' + m + '</span>'
                                    }
                                } else {
                                    return '<span class="sc-uid" data-uid="'+uid+'">' + m + '</span>'
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
    function showSuttaInfo($link, preload) {
        function showPopup(popupData) {
            var popup = $('<div class="sc-popup"/>').html(popupData),
                docWidth = $('article.boxed').width();
            $link.parents('article.boxed').append(popup);
            var offset = $link.offset(),
                popupWidth = popup.width();
            offset.top -= popup.outerHeight();
            if (offset.left + popupWidth > docWidth) {
                offset.left = docWidth * 1.05 - popupWidth;
            }
            popup.offset(offset);
            
            console.log($link, popupData, popup[0]);
            Ember.run.next(null, function(){
                $(document.body).on('click.sc.popop', function(e){
                    if ($(e.target).parents('.sc-popup').length > 0) {
                        return
                    }
                    popup.remove();
                    $(document.body).off('click.sc.popop');
                    return
                })
            })

        }
        function createPopup(data, code, jqXHR){
            $link.data('sc.popup.data', data)
            if (!preload) {
                showPopup(data);
            }
        }
        
        if (preload) {
            console.log('Preloading', [$link]);
        } else {
            console.log('Showing', [$link]);
        }
        
        var lang = $link.attr('data-lang') || 'en',
            uid = $link.attr('data-uid');
            
        if ($link.data('sc.popup.data')) {
            console.log('From existing data');
            showPopup($link.data('sc.popup.data'));
            return
        }

        if ($link.data('sc.popup.jqXHR')) {
            // debounce;
            return
        }

        var href = SCBaseUrl + '/sutta_info/' + uid + '?' + $.param({'lang': lang});
        var jqXHR = jQuery.ajax(href, {'cache': false})
                            .success(createPopup)
                            .error(function(){$link.removeClass('sc-uid')})
                            .always(function(){$link.data('sc-jqXHR', null)});
        $link.data('sc.popup.jqXHR', true);
    }
    $.fn.scUids = function(options) {
        var defaults = {},
            opts = $.extend(defaults, options || {}),
            result;
            
        result = this.each(function() {
            markupUids($(this), opts);
        }).on('click', '.sc-uid', function(e){showSuttaInfo($(e.currentTarget))});
        
        $('.sc-uid').each(function(){
            showSuttaInfo($(this), true);            
        })
        return result
    }
})(jQuery);
