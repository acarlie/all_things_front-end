$(document).ready(function () {

    $(document).on('click', '.article__header', function (event) {
        const isOpen = $(this).data('open');
        const id = $(this).attr('data-id');
        if (isOpen) {
            $(`#article-${id}`)
                .removeClass('article--open');
            $(`#toggler-${id}`)
                .addClass('article__toggler--closed')
                .removeClass('article__toggler--open');
            $(`#content-${id}`)
                .addClass('article__content-toggler--hidden')
                .removeClass('article__content-toggler--visible');
            $(this).data('open', false);
        } else {
            $(`#article-${id}`)
                .addClass('article--open');
            $(`#toggler-${id}`)
                .addClass('article__toggler--open')
                .removeClass('article__toggler--closed');
            $(`#content-${id}`)
                .addClass('article__content-toggler--visible')
                .removeClass('article__content-toggler--hidden');
            $(this).data('open', true);
        }
    });

    $(document).on('click', '.btn--submit', function (event) {
        event.preventDefault();
        const id = $(this).data('id');
        const title = $(`#note-title-${id}`).val().trim();
        const body = $(`#note-body-${id}`).val().trim();
        const obj = {
            title,
            body
        }
        console.log(obj);
    });

});
