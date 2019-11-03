$(document).ready(function () {
    $('.link--btn').attr('tabIndex', '-1');

    $(document).on('click', '.article__header', function (event) {
        const isOpen = $(this).data('open');
        const id = $(this).attr('data-id');
        if (isOpen) {
            $(`#article-${id}`)
                .removeClass('article--open');
            $(`#toggler-${id}`)
                .addClass('toggler__button--closed')
                .removeClass('toggler__button--open');
            $(`#content-${id}`)
                .addClass('article__content-toggler--hidden')
                .removeClass('article__content-toggler--visible');
            $(this).data('open', false);
        } else {
            $(`#article-${id}`)
                .addClass('article--open');
            $(`#toggler-${id}`)
                .addClass('toggler__button--open')
                .removeClass('toggler__button--closed');
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
                $(this).find('span').find('span').text('Edit Note');
            } else {
                $(this).find('span').find('span').text('+ Add Note');
            }
        } else {
            $(`#note-wrap-${id}`)
                .addClass('article__content-toggler--visible')
                .removeClass('article__content-toggler--hidden');
            $(this).data('open', true);
            $(this).find('span').find('span').text('X Cancel');
        }
    });

    $(document).on('click', '.btn--save', function (event) {
        event.preventDefault();
        const id = $(this).data('id');
        const isSaved = $(this).data('saved');
        const obj = isSaved ? { saved: false } : { saved: true };
        const me = $(this);

        $.ajax({
            type: 'PUT',
            url: `/save/${id}`,
            data: obj
        }).then((data) => {
            console.log(`Data saved: ${data}`);
            if (data.saved) {
                me.find('span').find('span').text('Removed from Saved');
                me.data('saved', true);
            } else {
                me.find('span').find('span').text('❤ Save Article');
                me.data('saved', false);
            }
        }).catch(err => {
            console.log(err);
        });
    });

    $(document).on('click', '#delete', function (event) {
        $.ajax({
            type: 'DELETE',
            url: `/delete`
        }).then(() => {
        });
        location.reload();
    });
});
