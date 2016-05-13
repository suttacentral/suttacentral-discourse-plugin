
import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: "enable-pali-input",
  initialize() {
    return
    withPluginApi('0.4', api => {
      api.onToolbarCreate( toolbar => {
        toolbar.addButton({
          id: 'pop-test',
          group: 'extras',
          icon: 'bolt',
          action: 'makeItPop',
          title: 'pop_format.title'
        })
      });
      
      api.decorateWidget('post:after', () => {
        return "I am displayed after every post";
      });
    })
    console.log('Init pali intput');
    return
    let Composer = container.lookupFactory('model:composer');
    Composer.reopen({
            open(opts) {
                this._super(opts);
                console.log('Open!', $('#wmd-button-bar'))
                Ember.run.next(null, function(){
                    //If the user clicks 'New Topic' multiple times this
                    //code can run multiple times.
                    if ($('.sc-pali-input').length > 0) return
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
                             ['sc-skt-char', 'Sanskrit', ['ṛ', 'ṝ', 'ḹ', 'ḥ', 'ś', 'ṣ']],
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
