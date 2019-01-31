$(function () {
    TinyDatePicker('#dueTo', {
        mode: 'dp-below',
        format: function (date) {
            return moment(date).format('DD.MM.YYYY')
        }
    })
})
