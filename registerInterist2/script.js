$(document).ready(function() {

    // Define all programs in a JavaScript object
    const allPrograms = {
        bachelor: [
            "البكالوريوس في القانون",
            "البكالوريوس في القانون وعلوم الشرطة",
            "البكالوريوس في العلوم الأمنية"
        ],
        master: [
            "الماجستير في القانون والبيئة",
            "ماجستير القانون في حقوق الإنسان",
            "ماجستير في البحث الجنائي",
            "الماجستير في الأمن السيبراني",
            "الماجستير في إدارة الأزمات الأمنية",
            "ماجستير القانون في الاستثمارات الدولية والقانون التجاري",
            "الماجستير في العلوم الجنائية",
            "الماجستير في القانون الخاص",
            "الماجستير في القانون العام"
        ],
        doctorate: [
            "دكتوراه في إدارة الأزمات الأمنية",
            "دكتوراه القانون والبيئة",
            "دكتوراه القانون في حقوق الإنسان",
            "دكتوراه في البحث الجنائي",
            "دكتوراه القانون في الاستثمارات الدولية والقانون التجاري",
            "دكتوراه في العلوم الجنائية",
            "دكتوراه في القانون الخاص",
            "دكتوراه في القانون العام"
        ]
    };

    // Initialize intl-tel-input plugin
    $("#phone").intlTelInput({
        initialCountry: "ae",
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js"
    });

    // Handle 'Apply Now' button click
    $('.apply-btn').on('click', function() {
        // Get the program name and type from the data attributes
        const programName = $(this).data('program');
        const programType = $(this).data('program-type');

        // Clear the dropdown and add a default option
        const programDropdown = $('#programDropdown');
        programDropdown.empty().append('<option value="">اختر برنامجاً...</option>');

        // Populate the dropdown with programs of the selected type
        const programsForType = allPrograms[programType];
        programsForType.forEach(function(program) {
            programDropdown.append($('<option>', {
                value: program,
                text: program
            }));
        });

        // Select the specific program that was clicked
        if (programName) {
            programDropdown.val(programName);
        }

        // Show the modal
        $('#registrationModal').modal('show');
    });

    // Handle hero button click to open modal with a pre-filled program, and list all programs
    $('.hero-btn').on('click', function() {
        const programDropdown = $('#programDropdown');
        programDropdown.empty().append('<option value="">اختر برنامجاً...</option>');

        // Populate the dropdown with all programs
        Object.values(allPrograms).flat().forEach(function(program) {
            programDropdown.append($('<option>', {
                value: program,
                text: program
            }));
        });
        
        // Show the modal
        $('#registrationModal').modal('show');
    });

    // Form submission and validation within the modal
    $('#registration-form').on('submit', function(event) {
        event.preventDefault();

        let isValid = true;
        const form = $(this);

        // All validation checks...
        const fullName = $('#fullName');
        if (fullName.val().trim() === '') {
            fullName.addClass('is-invalid');
            isValid = false;
        } else {
            fullName.removeClass('is-invalid');
        }

        const email = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.val())) {
            email.addClass('is-invalid');
            isValid = false;
        } else {
            email.removeClass('is-invalid');
        }

        const phoneInput = $("#phone");
        if (!phoneInput.intlTelInput("isValidNumber")) {
            phoneInput.addClass('is-invalid');
            isValid = false;
        } else {
            phoneInput.removeClass('is-invalid');
        }
        
        // Selected Program validation
        const selectedProgram = $('#programDropdown');
        if (selectedProgram.val().trim() === '') {
            selectedProgram.addClass('is-invalid');
            isValid = false;
        } else {
            selectedProgram.removeClass('is-invalid');
        }
        

        // Proceed if all fields are valid
        if (isValid) {
            console.log('Form submitted successfully!');
            console.log('Full Name:', fullName.val());
            console.log('Email:', email.val());
            console.log('Phone:', phoneInput.intlTelInput("getNumber"));
            console.log('Selected Program:', selectedProgram.val());

            // Clear the form fields after successful submission
            form[0].reset();

            // Hide the form fields and display the thank you message
            form.slideUp(500, function() {
                $('#thank-you-message').removeClass('d-none').hide().fadeIn(1000);
            });
        }
    });

    // Real-time validation for a better user experience
    $('#fullName, #email, #phone, #programDropdown').on('input change', function() {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        }
    });

    // Special validation for intl-tel-input
    $('#phone').on('input', function() {
        if ($(this).intlTelInput("isValidNumber")) {
            $(this).removeClass('is-invalid');
        }
    });

    // Reset form and message when the modal is closed
    $('#registrationModal').on('hidden.bs.modal', function() {
        $('#registration-form')[0].reset();
        $('#registration-form').show();
        $('#thank-you-message').addClass('d-none');
    });
});

