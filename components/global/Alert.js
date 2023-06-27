export default function Alert({ key, variant }) {

    var alert_style = {};
    if (variant == 'danger') {
        alert_style = {
            'min-width': '500px',
            'min-height': '50px',
            'background-color': 'transparent',
            'z-index': '5',
            'position': 'absolute',
            'border': '1px solid red',
            'border-radius': '10px'
        };
    } else if (variant == 'success') {
        alert_style = {};
    } else {
        alert_style = {};
    }


    return <div style={alert_style}>

    </div>
}