var socket = io();
var MQ = MathQuill.getInterface(2);
var elt = document.getElementById('calculator');
var options = {
	graphpaper: false
};
var calculator = Desmos.GraphingCalculator(elt, options);

var textboxArea = jQuery('#textboxes');
var textboxes;
var counter = 1;

elt.addEventListener('keypress', function(event) {
   if (event.key == 'Enter' && calculator.getExpressions().length != 0) {
        if (calculator.getExpressions()[0].latex == "") { return; }
         var expressionInLatex = calculator.getExpressions()[0].latex;
         console.log(expressionInLatex);
         
         textBox(expressionInLatex, true);
   }
});

// jQuery draggable plugin - https://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
(function($) {
    $.fn.draggable = function(options) {
        var $handle = this,
            $draggable = this;

        options = $.extend({}, {
            handle: null,
            cursor: 'move'
        }, options);

        if( options.handle ) {
            $handle = $(options.handle);
        }

        $handle.css('cursor', options.cursor).on("mousedown", function(e) {
            var x = $draggable.offset().left - e.pageX,
                y = $draggable.offset().top - e.pageY,
                z = $draggable.css('z-index');
                
            $draggable.css('z-index', 100000);
                
            $(document.documentElement)
                .on('mousemove.draggable', function(e) {
                    $draggable.offset({
                        left: x + e.pageX,
                        top: y + e.pageY
                    });
                    // //change elt's position too - prevent blank area on canvas
                    // if ($draggable == $('.dcg-container')) {
                    //     console.log('reached');
                    //     elt.offset({
                    //         left: x + e.pageX,
                    //         top: y + e.pageY
                    //     });
                    // }
                })
                .one('mouseup', function() {
                    $(this).off('mousemove.draggable');
                    $draggable.css('z-index', z);
                });

            // disable selection
            e.preventDefault();
        });
    }
})(jQuery);

function textBox(expressionInLatex, emit) {
    //inject expression into the sketchboard
    var textBox = jQuery('<p class="equationText draggable" id="' + counter + '"">' + expressionInLatex + '</p>');
    textboxArea.append(textBox);   //add CSS animation for the ejection
    //remove expression from desmos keyboard
    textboxes = jQuery('.equationText');
    calculator.removeExpression(calculator.getExpressions()[0]);
    var recentlyAdded = textboxes[textboxes.length - 1];
    //make the textbox an editable field
    var field = MQ.MathField(recentlyAdded);
    MQ.StaticMath(field);
    $('#' + counter).draggable();
    counter++;
    //add CSS animation for the ejection

    if (!emit) { return; }

    socket.emit('textbox', {
        text: expressionInLatex
    });
}

function onTextEvent(data) {  //process text boxes from the server
    textBox(data.text);
}

$('.dcg-container').draggable();
socket.on('textbox', onTextEvent);