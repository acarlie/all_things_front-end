$(document).ready(function () {

    $(document).on('click', '.article__toggler', function (event) {
        let isOpen = $(this).data('open');
        const id = $(this).attr('data-id');
        if (isOpen) {
            $(this).removeClass('article__toggler--active');
            $(`#content-${id}`).addClass('hidden');
            $(`#content-${id}`).removeClass('visible');
            $(this).data('open', false);
        } else {
            $(this).addClass('article__toggler--active');
            $(`#content-${id}`).removeClass('hidden');
            $(`#content-${id}`).addClass('visible');
            $(this).data('open', true);
        }
    });

});
