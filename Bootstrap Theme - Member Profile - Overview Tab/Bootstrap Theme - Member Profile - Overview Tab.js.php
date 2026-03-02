<script>
	$(document).ready(function() {
		// Hide the first H2 title of each .table-view.list-inline section if it is the only element inside its parent div, along with a div.clearfix, meaning "Company Details" is empty
		$('.table-view.list-inline').each(function() {
			var $parentDiv = $(this);
			// Check if the parent div contains exactly two children: div.clearfix and h2.tmargin.tpad.xs-center-block.clearfix
			if ($parentDiv.children('div.clearfix').length === 1 && $parentDiv.children('h2.tmargin.tpad.xs-center-block.clearfix').length === 1 && $parentDiv.children().length === 2) {
				$parentDiv.children('h2.tmargin.tpad.xs-center-block.clearfix').attr('style', 'display: none !important;');
			}
		});
	});
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {

    /* 1️⃣ Locate phone section */
    var phoneGroup = document.querySelector('.table-display-phone');
    if (!phoneGroup) return;

    var phoneValueWrap = phoneGroup.querySelector('.col-sm-8');
    if (!phoneValueWrap) return;

    /* 2️⃣ Extract actual phone number */
    var phoneLink = phoneValueWrap.querySelector('a[href^="tel:"]');
    if (!phoneLink) return;

    var phoneNumber = phoneLink.textContent.trim();

    /* 3️⃣ Replace phone UI with clean text version */
    phoneValueWrap.innerHTML = `
        <div class="member-contact-row">
            Phone:
            <span>${phoneNumber}</span>
        </div>
    `;

    /* 4️⃣ Move Email & Website block just below phone */
    var extraContact = document.querySelector('.member-extra-contact-details');
    if (extraContact) {
        phoneValueWrap.appendChild(extraContact);
    }

});
</script>
<script>
document.addEventListener("DOMContentLoaded", function () {

    // Target the Phone Number label inside Contact & Info tab
    var phoneHeading = document.querySelector(
        '#div1 .table-display-phone .col-sm-4.bold'
    );

    if (phoneHeading) {
        phoneHeading.textContent = 'Contact Details';
    }

});
</script>