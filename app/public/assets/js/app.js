const handler = {
    toggleCard: function (event) {
        const isOpen = $(this).data('open');
        const id = $(this).attr('data-id');
        if (isOpen) {
            $(`#article-${id}`)
                .removeClass('card--open');
            $(`#toggler-${id}`)
                .addClass('toggler__button--closed')
                .removeClass('toggler__button--open');
            $(`#content-${id}`)
                .addClass('card__content-toggler--hidden')
                .removeClass('card__content-toggler--visible');
            $(this).data('open', false);
        } else {
            $(`#article-${id}`)
                .addClass('article--open');
            $(`#toggler-${id}`)
                .addClass('toggler__button--open')
                .removeClass('toggler__button--closed');
            $(`#content-${id}`)
                .addClass('card__content-toggler--visible')
                .removeClass('card__content-toggler--hidden');
            $(this).data('open', true);
        }
    },
    addNote: function (event) {
        event.preventDefault();
        const id = $(this).data('id');
        const title = $(`#note-title-${id}`).val().trim();
        const body = $(`#note-body-${id}`).val().trim();
        $(`#note-title-text-${id}`).text(title);
        $(`#note-body-text-${id}`).text(body);
        $(`#note-wrap-${id}`).removeClass('card__content-toggler--visible').addClass('card__content-toggler--hidden').data('open', false);
        $(`#note-${id}`).removeClass('card__note--hidden');
        $(`#add-note-btn-${id}`).data('has-note', true);
        $(`#add-note-btn-${id}`).find('span').find('span').text('Edit Note');
        const obj = {
            title,
            body
        };
        $.ajax({
            type: 'POST',
            url: `/articles/${id}`,
            data: obj
        }).then((data) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    },
    toggleNoteForm: function (event) {
        event.preventDefault();
        const id = $(this).data('id');
        const isOpen = $(this).data('open');
        const hasNote = $(this).data('has-note');
        if (isOpen) {
            $(`#note-wrap-${id}`)
                .addClass('card__content-toggler--hidden')
                .removeClass('card__content-toggler--visible');
            $(this).data('open', false);
            if (hasNote) {
                $(this).find('span').find('span').text('Edit Note');
            } else {
                $(this).find('span').find('span').text('+ Add Note');
            }
        } else {
            $(`#note-wrap-${id}`)
                .addClass('card__content-toggler--visible')
                .removeClass('card__content-toggler--hidden');
            $(this).data('open', true);
            $(this).find('span').find('span').text('X Cancel');
        }
    },
    saveArticle: function (event) {
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
    },
    clearAll: function (event) {
        $.ajax({
            type: 'DELETE',
            url: `/delete`
        }).then(() => {
        });
        location.reload();
    }
};

$(document).ready(function () {
    $('.link--btn').attr('tabIndex', '-1');
    $(document).on('click', '.card__header', handler.toggleCard);
    $(document).on('click', '.btn--submit', handler.addNote);
    $(document).on('click', '.btn--note', handler.toggleNoteForm);
    $(document).on('click', '.btn--save', handler.saveArticle);
    $(document).on('click', '#delete', handler.clearAll);
});
