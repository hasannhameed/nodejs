.member-profile-header {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.member-profile-header .member-badges {
	align-self: flex-start;
}
@media only screen and (max-width: 767px) {
	.profile-header-write-review {
		margin-top: 10px !important;
	}
}
/* MAIN CARD STYLES 
*/
.custome-member-profile {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    padding: 30px 30px !important;
    text-align: center;
    width: 100% !important; 
    max-width: none !important;
    margin: 30px auto !important;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Force all columns to full width for stacking */
.custome-member-profile .col-xs-12,
.custome-member-profile .col-sm-2,
.custome-member-profile .col-sm-3,
.custome-member-profile .col-sm-9,
.custome-member-profile .col-sm-6,
.custome-member-profile .col-sm-10,
.custome-member-profile .col-sm-12 {
    width: 100% !important;
    float: none !important;
    padding: 0 !important;
    margin: 0 !important;
    text-align: center;
}

/* Profile Image */
.custome-member-profile .profile-image img {
    border-radius: 50%;
    width: 120px !important;
    height: 120px !important;
    object-fit: cover;
    margin-bottom: 20px;
}

/* Name and Badge Alignment */
.custome-member-profile h1 {
    
    font-size: 35px;
    font-weight: 700;
    color: #222;
    margin: 0 !important;
    display: inline-block;
}
.custome-member-profile .name-badge-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 5px;
}
.custome-member-profile .member-badges-inline {
    display: inline-block;
    vertical-align: middle;
}
.custome-member-profile .member-badges-inline img {
    height: 20px; 
    width: auto;
    display: block;
}
/* Ensure no CSS content is added after the h1 */
.custome-member-profile h1:after {
    display: none !important;
}

/* Location */
.custome-member-profile .profile-header-location {
    font-size: 18px;
    color: #666;
    display: block;
    margin-bottom: 20px;
}
.custome-member-profile .profile-header-location i {
    display: none; 
}

/* Description */
.helena-description {
    font-size: 16px;
    color: #000;
    line-height: 1.5;
    max-width: 65ch;
    margin: 0 auto 0px auto;
}

/* Stats Row */
.helena-stats-container {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px; 
    border-top: 0; 
}
.helena-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.helena-stat-num {
    font-weight: 700;
    font-size: 22px;
    color: #222;
}
.helena-stat-label {
    font-size: 14px;
    color: #000;
    margin-top: 4px;
}

/* BUTTON STYLES & ALIGNMENT FIX 
*/
.helena-buttons-wrapper {
    width: 100%;
    max-width: 450px; /* Constrain button width for cleaner centered look */
    margin: 0 auto;
    display: flex;
    flex-direction: column; /* Stack buttons vertically */
    gap: 15px; /* Space between buttons */
}

/* Force container divs to have no margins interacting with flex gap */
.helena-button-col {
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    float: none !important;
}

.helena-btn-primary {
    background-color: rgb(15, 134, 108) !important;
    border-color:rgb(15, 134, 108) !important;
    color: #fff !important;
    border-radius: 8px !important;
    padding: 18px 0 !important;
    font-size: 16px !important;
    font-weight: 500;
    width: 100% !important; /* Ensure full width */
    display: block;
}
.helena-btn-primary:hover {
    background-color: rgb(15, 134, 108) !important;
}

.helena-btn-secondary {
    background-color: #fff !important;
    border: 1px solid #e0e0e0 !important;
    color: #222 !important;
    border-radius: 8px !important;
    padding: 18px 0 !important;
    font-size: 16px !important;
    font-weight: 500;
    box-shadow: none !important;
    width: 100% !important; /* Ensure full width */
    display: block;
    margin-top: 0 !important; /* Remove legacy margins */
}
.helena-btn-secondary:hover {
    background-color: #f9f9f9 !important;
}

/* Text Replacement */
.helena-btn-primary .orig-text,
.helena-btn-secondary .orig-text {
    display: none;
}
.helena-btn-primary .new-text,
.helena-btn-secondary .new-text {
    display: inline;
}

/* Hide Unwanted Elements */
.custome-member-profile .header-favorite-button,
.custome-member-profile .profile-header-top-category,
.custome-member-profile .profile-header-company {
    display: none !important;
}
.member-profile-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

@media only screen and (max-width: 767px) {
    .profile-header-write-review {
        margin-top: 10px !important;
    }
}