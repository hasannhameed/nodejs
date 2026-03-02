<script>
(function () {

    function pinHelpOptionWithoutBreakingHighlight() {
        const $select = $('#tid');
        const hasSelection = !!$select.val(); // true if user selected something
        const $results = $('.select2-results');

        if (!$results.length) return;

        $results.each(function () {
            const $list = $(this);

            const $helpItem = $list.find('li').filter(function () {
                return $(this).text().trim() === 'I Need Help with';
            });

            if (!$helpItem.length) return;

            /* ---- ALWAYS keep on top ---- */
            $list.prepend($helpItem);

            /* ---- ONLY highlight when NOTHING is selected ---- */
            if (!hasSelection) {
                $list.find('li').removeClass('select2-highlighted');
                $helpItem.addClass('select2-highlighted');
            }
            
        });
    }

    $(document).on('select2-open', function () {
        setTimeout(pinHelpOptionWithoutBreakingHighlight, 0);
    });

    $(document).on('keyup', '.select2-input', function () {
        setTimeout(pinHelpOptionWithoutBreakingHighlight, 0);
    });

})();
</script>
<!-- /* <script>
document.addEventListener("DOMContentLoaded", function () {
    var search = document.querySelector('.search-filter');
    if (search) {
        search.style.display = 'block';
    }
});
</script> */ -->
