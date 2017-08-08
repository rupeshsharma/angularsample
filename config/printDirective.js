var APP = angular.module('sample');
APP.directive("ngPrint", function() {
    var printSection = document.getElementById('printSection');
        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }
        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                elemToPrint.style.display='block';
                if (elemToPrint) {
                    printElement(elemToPrint);
                }
                printSection.innerHTML = '';
                elemToPrint.style.display='none';
            });
            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            }
        }
        function printElement(elem) {
            // clones the element you want to print
            var domClone = elem.cloneNode(true);
            printSection.appendChild(domClone);
            window.print();
        }
        return {
            link: link,
            restrict: 'A'
        };
});
