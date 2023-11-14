export class Formatter
{
    dollar(num)
    {
        num = Number(num)
        num = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return '$' + num
    }

    signficantDollar(num, symbol = '$')
    {
        num = Number(num)
        var suffix = 'K';
        var dollar = (num/1000).toFixed(0)
        if(dollar >= 1000){
            var suffix = 'M';
            dollar = (dollar/1000).toFixed(1);
        }
        return symbol + dollar + suffix
    }

    date(date)
    {
        if(date == null) return '';
        const d = new Date(date)
        return d.toLocaleDateString()
    }

    datetime(date)
    {
        if(date == null) return '';
        const d = new Date(date)
        return d.toLocaleString()
    }

    fileSize(size)
    {
        if(!size) return '--'
        if(size/1000000000 >= 1){
            return (size/1000000000).toFixed(1) + ' GB'
        } else if (size/1000000 >= 1){
            return (size/1000000).toFixed(1) + ' MB'
        } else if (size/1000 >= 1){
            return (size/1000).toFixed(1) + ' KB'
        } else {
            return size + ' B'
        }
    }

    phone(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return '';
    }
}