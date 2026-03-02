<?php
$subscription = getSubscription($user['subscription_id'], $w);
$multi_location = addonController::isAddonActive('multi_location');
$sectionAmount = 5;
if ($multi_location) {
    $sectionAmount = 6;
}

for ($section_order = 1; $section_order <= $sectionAmount; $section_order++){
    if (($subscription['location_map_order'] == $section_order || (!isset($subscription['location_map_order']) && $section_order == 1)) && $user['lat'] != "" && $user['lon'] != "") {
        $get_address = trim($user['address1']) . " " . trim($user['address2']) . " " . trim($user['city']) . " " . trim($user['state_ln']) . " " . trim($user['zip_code']) . " " . trim($user['country_ln']);
        $full_address = str_replace(' ', '+', $get_address);
        ?>        
        <div class="clearfix"></div>		
		<?php if(!empty($label['get_directions_label']) || !empty($label['sidebar_viewmap'])){ ?>
			<div class="alert alert-secondary fpad-sm nomargin bg-secondary no-radius-bottom profile-map-header">
				<?php if(!empty($label['get_directions_label'])){?>
					<a class="btn btn-sm btn-secondary bold map-link get-directions-link" rel="nofollow" target="_blank" href="https://maps.google.com/maps?daddr=<?php echo $full_address ; ?>" title="%%%click_for_directions%%%">
						%%%get_directions_label%%%
					</a>
				<?php } ?>
				<?php if(!empty($label['sidebar_viewmap'])){?>
					<a class="btn btn-sm btn-secondary bold pull-right map-link larger-map-link" href="#" target="_blank" data-target="#locationModal" data-toggle="modal" title="%%%sidebar_viewmap%%%">
						%%%sidebar_viewmap%%%
					</a>
				<?php } ?>
				<div class="clearfix"></div>
			</div>
		<?php } ?>
        <div class="clearfix"></div>
		<div id="map-canvas" class="no-radius-top"></div>
		<div class="clearfix bmargin"></div>
    <?php }

    if (($subscription['user_quote_order'] == $section_order || (!isset($subscription['user_quote_order']) && $section_order == 2)) && $user['quote']!=""){
        $allowedTagsQuote = "<b><strong><em><i><del><ins>";
        if (($w) && (array_key_exists("quote_live_links", $w)) && ($w['quote_live_links'] == 1)) {
            $allowedTagsQuote .= "<a>";
        }
        ?>
        <div class="clearfix"></div>
        <div class="well bmargin tmargin quote_box">
            <?php echo strip_tags($user['quote'],$allowedTagsQuote);?>
		</div>
		<div class="clearfix"></div>
    <?php }

    if ($subscription['contact_details_order'] == $section_order || (!isset($subscription['contact_details_order']) && $section_order == 3)){ ?>
        <?php
        /* Renders Data from Members Contact Details Form if Field DISPLAY VIEW is YES */
        if ($w['respect_member_data_display_setting'] == "1") {
            $contact_details_form = $subscription['contact_details_form'];
            $vars['view'] = "display";
            $vars['table_classes'] = "class";
            $vars['display_blank_values'] = 1;
            echo showEmailFields($contact_details_form,$user,$vars,$w,false);
            ?>

            <!-- ✅ ADDED: Email & Website below Phone -->
            <?php
            $email   = !empty($user['email']) ? $user['email'] : '';
            $website_plain = !empty($user['website']) ? urldecode($user['website']) : '';
            ?>

            <?php if ($email || $website_plain) { ?>
                <div class="member-extra-contact-details">

                    <?php if ($email) { ?>
                        <div class="member-contact-row">
                            Email:
                            <a href="mailto:<?php echo $email; ?>">
                                <?php echo $email; ?>
                            </a>
                        </div>
                    <?php } ?>

                    <?php if ($website_plain) { ?>
                        <div class="member-contact-row">
                            Website:
                            <a href="<?php echo $website_plain; ?>" target="_blank" rel="nofollow">
                                <?php echo preg_replace('#^https?://#', '', $website_plain); ?>
                            </a>
                        </div>
                    <?php } ?>

                </div>
            <?php } ?>
            <!-- ✅ END ADD -->

        <?php }
        else { /* Renders Deprecated Method for Displaying Members Contact Details */ ?>
            [widget=Bootstrap Theme - Deprecated - Member Profile - Display - Member Contact Details]
        <?php } ?>
    <?php }

    if ($subscription['listing_details_order'] == $section_order || (!isset($subscription['listing_details_order']) && $section_order == 4)){ ?>
        <?php
        /* Renders Data from Members Listing Details Form if Field DISPLAY VIEW is YES */
        if ($w['respect_member_data_display_setting'] == "1") {
            $listing_details_form = $subscription['listing_details_form'];
            $vars['view'] = "display";
            $vars['table_classes'] = "class";
            $vars['display_blank_values'] = 1;
            echo showEmailFields($listing_details_form,$user,$vars,$w,false); ?>
        <?php } else { /* Renders Deprecated Method for Displaying Members Listing Details Data */ ?>
            <h2 class="tmargin tpad xs-text-center xs-center-block clearfix">%%%listing_details%%%</h2>
            <?php echo $_ENV['member_rows']; ?>
        <?php }
    }

    if ($subscription['about_order'] == $section_order || (!isset($subscription['about_order']) && $section_order == 5)){
        if ($subscription['show_about_tab'] != 0 ) {
			echo '<div class="overview-tab-about-me">';
            form_controller::showAboutFormFields($subscription,$user);
			echo '<div class="clearfix"></div></div>';
        } ?>
    <?php }

    if($subscription['list_services_areas_order'] == $section_order || (!isset($subscription['list_services_areas_order']) && $section_order == 6)){
		echo '<div class="tmargin tpad overview-tab-service-areas">';
		echo widget("Bootstrap Theme - Member Profile - Display Service Area Links");
		echo '<div class="clearfix"></div></div>';
    }
}
?>
<div class="clearfix">
<?php
// Safely decode social URLs
$website  = !empty($user['website'])  ? urldecode($user['website'])  : '';
$facebook = !empty($user['facebook']) ? urldecode($user['facebook']) : '';
$linkedin  = !empty($user['linkedin'])  ? urldecode($user['linkedin'])  : '';
?>

<?php if ($website || $facebook || $linkedin) { ?>
    <div class="clearfix"></div>

    <div class="connect-with-me-wrapper">
        <div class="connect-with-me-box">
            <h4><strong>Connect with me</strong></h4>

            <div class="connect-with-me-icons">

                <?php if ($website) { ?>
                    <a href="<?php echo $website; ?>" target="_blank" rel="nofollow" title="Website">
                        <i class="fa fa-globe"></i>
                    </a>
                <?php } ?>

                <?php if ($facebook) { ?>
                    <a href="<?php echo $facebook; ?>" target="_blank" rel="nofollow" title="GitHub">
                        <i class="fa fa-github" aria-hidden="true"></i>
                    </a>
                <?php } ?>

                <?php if ($linkedin) { ?>
                    <a href="<?php echo $linkedin; ?>" target="_blank" rel="nofollow" title="LinkedIn">
                        <i class="fa fa-linkedin"></i>
                    </a>
                <?php } ?>

            </div>
        </div>
    </div>
<?php } ?>

</div>