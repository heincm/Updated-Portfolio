$('p').on('click', function(){
    console.log('you clicked me')
})
$('form').on('submit', (event) => {
    event.preventDefault();

    const email = $('#email').val().trim();
    const subject = "Website email from " + $('#first_name').val().trim() + " " + $('#last_name').val().trim();
    const text =$('#text').val().trim();

    const data = {
        email, 
        subject, 
        text: "First Name: " + $('#first_name').val().trim() + "\nLast Name: " + $('#last_name').val().trim() + "\nMessage:\n" + text
    };

    $.post('/email', data, function(){
        console.log('server got the data')
    })
})