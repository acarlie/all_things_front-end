const handlers = {
    toggleCard: function (event) {
        const isOpen = $(this).attr('aria-expanded') === 'true';
        const id = $(this).attr('data-id');
        if (isOpen) {
            $(`#article-${id}`)
                .removeClass('card--open');
            $(`#toggler-${id}`)
                .addClass('toggler__button--closed')
                .removeClass('toggler__button--open');
            $(`#content-${id}`)
                .addClass('card__content-toggler--hidden')
                .removeClass('card__content-toggler--visible')
                .attr('aria-hidden', true);
            $(this)
                .data('open', false)
                .attr('aria-expanded', false);
        } else {
            $(`#article-${id}`)
                .addClass('card--open');
            $(`#toggler-${id}`)
                .addClass('toggler__button--open')
                .removeClass('toggler__button--closed');
            $(`#content-${id}`)
                .addClass('card__content-toggler--visible')
                .removeClass('card__content-toggler--hidden')
                .attr('aria-hidden', false);
            $(this)
                .data('open', true)
                .attr('aria-expanded', true);
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
            url: `/api/articles/${id}`,
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
        const isOpen = $(this).attr('aria-expanded') === 'true';
        const hasNote = $(this).data('has-note');
        if (isOpen) {
            $(`#note-wrap-${id}`)
                .addClass('card__content-toggler--hidden')
                .removeClass('card__content-toggler--visible');
            $(this).attr('aria-expanded', false);
            if (hasNote) {
                $(this).find('span').find('span').text('Edit Note');
            } else {
                $(this).find('span').find('span').text('+ Add Note');
            }
        } else {
            $(`#note-wrap-${id}`)
                .addClass('card__content-toggler--visible')
                .removeClass('card__content-toggler--hidden');
            $(this).attr('aria-expanded', true);
            $(this).find('span').find('span').html('X Cancel <span class="sr-only">note</span>');
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
            url: `/api/save/${id}`,
            data: obj
        }).then((data) => {
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
            url: `/api/delete`
        }).then(() => {
        });
        location.reload();
    }
};

$(document).ready(function () {
    $('.link--btn').attr('tabIndex', '-1');
    $(document).on('click', '.card__header-toggle', handlers.toggleCard);
    $(document).on('click', '.btn--submit', handlers.addNote);
    $(document).on('click', '.btn--note', handlers.toggleNoteForm);
    $(document).on('click', '.btn--save', handlers.saveArticle);
    $(document).on('click', '#delete', handlers.clearAll);
});
