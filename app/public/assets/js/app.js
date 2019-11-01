$(document).ready(function () {
    // $('.btn a').attr('tabIndex', '-1');
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
        };
        $.ajax({
            type: 'POST',
            url: `/articles/${id}`,
            data: obj
        }).then(() => {
            $(`#note-title-${id}`).val('');
            $(`#note-body-${id}`).val('');
            location.reload();
        }).catch(err => {
            console.log(err);
        });
    });

    $(document).on('click', '.btn--note', function (event) {
        event.preventDefault();
        const id = $(this).data('id');
        const isOpen = $(this).data('open');
        const hasNote = $(this).data('hasNote');
        if (isOpen) {
            $(`#note-wrap-${id}`)
                .addClass('article__content-toggler--hidden')
                .removeClass('article__content-toggler--visible');
            $(this).data('open', false);
            if (hasNote) {
                $(this).find('a').text('Edit Note');
            } else {
                $(this).find('a').text('+ Add Note');
            }
        } else {
            $(`#note-wrap-${id}`)
                .addClass('article__content-toggler--visible')
                .removeClass('article__content-toggler--hidden');
            $(this).data('open', true);
            $(this).find('a').text('X Cancel');
        }
    });
});
