

export default {
  name: "enable-pali-input",
  initialize: function(container) {
    let Composer = container.lookupFactory('model:composer');
    Composer.reopen({
            open(opts) {
                console.log('Open!', $('#wmd-button-bar'))
                Ember.run.next(null, function(){
                    var option = $('<li/>'),
                        buttonRow = $('#wmd-button-row'),
                        button = $('<div/>').attr({
                            'class': 'wmd-button sc-pali-input',
                            title: 'Insert Pali Characters'
                        }).text('āĀ');
                        
                    buttonRow.append($('<div class="wmd-spacer" id="wmd-spacer2"></div>'))
                             .append(button);

                    var charGroups =[['sc-pali-char', 'Pāli and Sanskrit', ['ā', 'ī', 'ū', 'ṁ', 'ṅ', 'ñ', 'ṭ',
                             'ḍ', 'ṇ', 'ḷ']],
                             ['sc-skt-char', 'Sanskrit', ['ṛ', 'ṝ', 'ḷ', 'ḹ', 'ḥ', 'ś', 'ṣ']],
                             ['sc-pali-input-caps', 'Toggle Case', ['⇪']]];
                    
                    var charTable = $('<div id="sc-pali-char-table"/>')
                                    .appendTo(button)
                                    .hide(),
                        innerWrap = $('<div id="sc-pali-char-table-inner-wrap"/>')
                                    .appendTo(charTable),
                        charButton = $('<button class="sc-pali-input-char"/>');
                    charGroups.forEach(function(charGroup) {
                        var klass = charGroup[0],
                            title = charGroup[1],
                            chars = charGroup[2];
                        
                        chars.forEach(function(cLower) {
                            var btn = charButton.clone()
                                                .text(cLower)
                                                .addClass(klass)
                                                .attr('title', title);
                            if (cLower == ' ') {
                                btn.addClass('sc-pali-input-blank')
                                   .attr('disabled', 'disabled');
                            }
                            innerWrap.append(btn);
                        });
                    });
                    
                    button.on('click', function(e) {
                        var target = $(e.target),
                            input = $('#wmd-input');
                        input.focus();
                        if (target.is(button)) {
                            charTable.toggle();
                        } else if (target.hasClass('sc-pali-input-caps')) {
                            var upper = !button.data('sc.pali-input.upper');
                            button.data('sc.pali-input.upper', upper);
                            $('.sc-pali-input-char').each(function(){
                                if (upper) {
                                    $(this).text($(this).text().toUpperCase())
                                } else {
                                    $(this).text($(this).text().toLowerCase())
                                }
                            });
                        } else {
                            input[0].value += target.text();
                        }
                    });
                });
            },
        })
  }
};
