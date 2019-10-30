$(document).ready(function () {

    $(document).on('click', '.article__toggler', function (event) {
        const isOpen = $(this).data('open');
        const id = $(this).attr('data-id');
        if (isOpen) {
            $(this).removeClass('article__toggler--active');
            $(`#content-${id}`).addClass('hidden');
            $(this).data('open', false);
        } else {
            $(this).addClass('article__toggler--active');
            $(`#content-${id}`).removeClass('hidden');
            $(this).data('open', true);
        }
    });

});
