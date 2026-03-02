<?php
$sub = getSubscription($user['subscription_id'],$w);
//get the review data_id
$reviewIdQuery = mysql(brilliantDirectories::getDatabaseConfiguration('database'),"SELECT
        *
    FROM
        `data_categories`
    WHERE
        data_type = '13'
    LIMIT
        1");
$reviewId = mysql_fetch_assoc($reviewIdQuery);
$reviewState = 0;
foreach ($sub['data_settings'] as $sdskey => $sdsvalue) {

    if ($sdsvalue == $reviewId['data_id']) {
        $reviewState = 1;//ON
    }
}
$userPhoto = getUserPhoto ($user['user_id'], $user['listing_type'], $w);
$userPhoto = $userPhoto['file'];

if($sub['coverPhoto'] == 1){
    addonController::showWidget('profile_cover_photo', '023876071143573e41dd0e03f5f56894','');
}

/* --- CUSTOM LOGIC FOR STATS --- */
$stats_sql = mysql(brilliantDirectories::getDatabaseConfiguration('database'), "
    SELECT 
        COUNT(*) as total_reviews, 
        AVG(rating_overall) as avg_rating 
    FROM users_reviews 
    WHERE user_id = '".$user['user_id']."' 
    AND review_status = 2
");
$stats_data = mysql_fetch_assoc($stats_sql);
$calc_rating = number_format((float)$stats_data['avg_rating'], 1, '.', '');
$calc_reviews = $stats_data['total_reviews'];
/* -------------------------------------------------- */
?>

<div class="row member-profile-header bmargin custome-member-profile">
    
    <div class="col-xs-12 <?php if ($subscription['profile_badge'] != "" || $user['verified'] == 1 || $user['nationwide'] == 1 || strtolower($subscription['location_limit']) == "all") { ?>col-sm-2<?php } else { ?>col-sm-3<?php } ?> norpad text-center xs-hpad xs-bmargin profile-image">
        <?php
        list($width, $height, $type, $attr) = getimagesize($_SERVER['DOCUMENT_ROOT'] . $userPhoto);
        if ($attr == "") {
            $attr = 'width="400" height="400"';
        }
        if ($sub['receive_messages'] != 1) { 
        ?>
            <a href="/<?php echo $user['filename']; ?>/<?php echo $w['default_connect_url'];?>" title="%%%contact_label%%% <?php echo $w['profession']; ?> <?php echo $user['full_name'];?>">
                <img <?php echo $attr; ?> class="img-rounded" src="<?php echo $userPhoto;?>" alt="<?php echo $w['profession']; ?> <?php echo $user['full_name']; ?> %%%in_label%%% <?php echo $user['city']; ?> <?php echo $user['state_code']; ?>" title="%%%contact_label%%% <?php echo $user['full_name']; ?>">
            </a>
        <?php } else { ?>
            <img <?php echo $attr; ?> class="img-rounded" src="<?php echo $userPhoto;?>" alt="<?php echo $w['profession']; ?> <?php echo $user['full_name']; ?> %%%in_label%%% <?php echo $user['city']; ?> <?php echo $user['state_code']; ?>" title="%%%contact_label%%% <?php echo $user['full_name']; ?>">
        <?php } ?>
    </div>
    
    <div class="xs-text-center col-xs-12 col-sm-9 the-header-member-main-info">
        
        <div class="row the-header-member-name">
            <div class="col-sm-12 norpad xs-hpad header-member-name xs-center-block notranslate name-badge-container">
                <h1 class="bold inline-block">
                    <?php echo $user['full_name']; ?>
                </h1>
                
                <?php
                if ($subscription['profile_badge'] != "" || $user['verified'] == 1 || $user['nationwide'] == 1 || strtolower($subscription['location_limit']) == "all") { ?>
                    <div class="inline-block member-badges-inline">
                        <?php echo widget("Bootstrap Theme - Member Profile - Badges","",$w['website_id'],$w); ?>
                    </div>
                <?php } ?>
            </div>

            <?php
            $addonFavorites = getAddOnInfo("add_to_favorites","a8ad175dd81204563b3a9fc3ebcd5354");
            if (isset($addonFavorites['status']) && $addonFavorites['status'] === 'success') {
                echo "<div class='col-sm-2 text-right nolpad bmargin xs-nopad xs-text-center xs-center-block header-favorite-button'>";
                echo widget($addonFavorites['widget'],"",$w['website_id'],$w);
                echo "</div>";
            } ?>
        </div>
        
        <div class="row the-header-member-details">
            <div class="col-sm-12 tmargin xs-nomargin">
                <p class="line-height-xl nomargin">
                    <?php
                    $invisibleClass ='';
                    if($w['hide_top_level_member_profile'] == 1){
                        $invisibleClass ='invisible';
                    }
                    if ($user['profession_id'] != "") {
                        echo "<span class='profile-header-top-category $invisibleClass'>";
                        echo stripslashes(getProfession($user['profession_id'],$w))."<br /></span>";
                    }
                    if ($user['listing_type'] != 'Company') {
                        echo "<span class=profile-header-company>";
                        if ($user['company'] != "") {

                            if ($user['position'] != "") { ?>
                                <?php echo $user['position'];?> %%%at_label%%%
                            <?php }
                            echo $user['company'];
                            echo "<br /></span>";
                        }
                    }
                    if ($sub['profile_layout'] != "0" && (!empty($user['city']) || !empty($user['state_ln']) || !empty($user['zip_code']) || !empty($user['country_ln']))) {
                        echo '<span class=profile-header-location><i class="fa fa-map-marker text-danger hidden"></i> '; 

                        if (!empty($user['city']) || !empty($user['state_ln']) || !empty($user['zip_code'])) {
                            if (!empty($user['city'])) { 
                                echo $user['city'];
                            }
                            if (!empty($user['state_ln'])) {
                                if(!empty($user['city'])) {
                                    echo ", ";
                                }
                                echo $user['state_ln'];
                            }
                            if (!empty($user['zip_code'])) {
                                if(!empty($user['city']) || !empty($user['state_ln'])) {
                                    echo ", ";
                                }
                                echo $user['zip_code'];
                            }
                        } else if (!empty($user['country_ln'])) {
                            echo $user['country_ln'];
                        }
                        echo "</span>";
                    } ?>
                </p>
                
                <div class="helena-description">
                     <?php 
                     $desc = strip_tags($user['search_description']); 
                     if(empty($desc)) { $desc = strip_tags($user['about_me']); }
                     if(empty($desc)) { $desc = "Award-winning firm specializing in biophilic design and sustainable materials. We create calm, functional, and beautiful spaces."; } 
                     echo $desc; 
                     ?>
                </div>

                <div class="helena-stats-container">
                    
                    <?php if (!empty($user['projects_done'])) { ?>
                        <div class="helena-stat-item">
                            <span class="helena-stat-num"><?php echo $user['projects_done']; ?></span>
                            <span class="helena-stat-label">Projects</span>
                        </div>
                    <?php } ?>

                    <div class="helena-stat-item" style="display:none;">
                        <span class="helena-stat-num">22.k</span>
                        <span class="helena-stat-label">Followers</span>
                    </div>

                    <?php if (!empty($calc_reviews) && $calc_reviews > 0) { ?>
                        <div class="helena-stat-item">
                            <span class="helena-stat-num"><?php echo $calc_rating; ?></span>
                            <span class="helena-stat-label">Rating (<?php echo $calc_reviews; ?> Reviews)</span>
                        </div>
                    <?php } ?>
                    
                </div>

            </div>

            <div class="helena-buttons-wrapper">
                
                <?php
                if ($sub['receive_messages'] != 1) { ?>
                    <div class="tmargin profile-header-send-message helena-button-col">
                        <a class="btn btn-primary btn-block btn-lg btn-send_message_action helena-btn-primary" title="%%%contact_label%%% <?php echo $user['full_name']; ?>" href="/<?php echo $user['filename']; ?>/<?php echo $w['default_connect_url'];?>">
                        <?php if ($w['enable_direct_chat_messages'] == "1" && $subscription['enable_direct_messages'] == "1") { ?>
                            <span class="orig-text">%%%send_message_action%%%</span>
                        <?php } else { ?>
                            <span class="orig-text">%%%profile_send_message_button%%%</span>
                        <?php } ?>
                            <span class="new-text">Book Consultation</span>
                        </a>
                    </div>
                <?php } ?>

                <?php
                if ($reviewState == 1 && (($sub['receive_messages'] != 1 && $user['phone_number'] != "" && $sub['show_phone'] == 1) || ($subscription['receive_messages'] == 1 && ($subscription['show_phone'] != 1 || $sub['show_phone'] == 1 && $user['phone_number'] == "")))) { ?>
                    <div class="tmargin profile-header-write-review helena-button-col">
                        <?php
                        if ($reviewState == 1 && $subscription['hide_reviews_rating_options'] == 0) {
                            echo "<div class='hidden'>".$rating['stars']."</div>"; 
                        } ?>
                        <?php
                        if ($reviewState == 1) { ?>
                            <a class="tmargin btn btn-secondary btn-lg btn-block btn-write_a_review_for helena-btn-secondary" href="/<?php echo $user['filename']; ?>/writeareview" title="%%%write_a_review_for%%%">
                                <span class="orig-text">%%%profile_write_a_review%%%</span>
                                <span class="new-text">Write a Review</span>
                            </a>
                        <?php } ?>
                    </div>
                <?php } ?>

                <?php
                if ($reviewState == 1 && (($subscription['receive_messages'] == 1 && $subscription['show_phone'] == 1 && $user['phone_number'] != "") || ($sub['receive_messages'] != 1 && ($sub['show_phone'] == 0 ||  $sub['show_phone'] == 1 && $user['phone_number'] == "")))) {
                    $reviewsAmount = mysql(brilliantDirectories::getDatabaseConfiguration('database'),"SELECT 1
                    FROM
                        `users_reviews`
                    WHERE
                        user_id = ".$user['user_id']." AND review_status = 2");
                    $memberReviewsExist = mysql_fetch_array($reviewsAmount);
                    ?>
                    <div class="profile-header-write-review helena-button-col" style="margin-top:<?php if ($memberReviewsExist == false || $subscription['hide_reviews_rating_options'] == 1){echo '15px';}else{echo '0px';}?>;">
                        <?php
                        if ($reviewState == 1 && $subscription['hide_reviews_rating_options'] == 0) {
                            echo "<div class='hidden'>".$rating['stars']."</div>"; 
                        } ?>
                        <?php
                        if ($reviewState == 1) { ?>
                            <a class="tmargin btn btn-secondary btn-lg btn-block btn-write_a_review_for helena-btn-secondary" href="/<?php echo $user['filename']; ?>/writeareview" title="%%%write_a_review_for%%%">
                                <span class="orig-text">%%%profile_write_a_review%%%</span>
                                <span class="new-text">Write a Review</span>
                            </a>
                        <?php } ?>
                    </div>
                <?php } ?>
                
            </div>

            <?php
            if ($user['phone_number'] != "" && $sub['show_phone'] == 1) { ?>
                <div class="col-sm-6 tmargin hidden"> 
                    <?php
                    $clickPhoneAddOn = getAddOnInfo("click_to_phone","16c3439fea1f8b6d897987ea402dcd8e");
                    $statisticsAddOn = getAddOnInfo("user_statistics_addon","7f778bc02f0e6acbbd847b4061c7b76d");

                    if(isset($clickPhoneAddOn['status']) && $clickPhoneAddOn['status'] === 'success'){
                        echo widget($clickPhoneAddOn['widget'],"",$w['website_id'],$w);
                    } else if (isset($statisticsAddOn['status']) && $statisticsAddOn['status'] === 'success') {
                        echo widget($statisticsAddOn['widget'],"",$w['website_id'],$w);
                    } else {
                        if ($user['phone_number'] != "" && $sub['show_phone'] == 1) { ?>
                            <span style="padding:10px 16px;" class="well nobmargin text-center btn-lg btn-block author-phone">
                                %%%show_phone_number_icon%%%
                                <?php echo $user['phone_number']; ?>
                            </span>
                        <?php }
                    } ?>
                </div>
            <?php } ?>

        </div>
    </div>
</div>
<div class="clearfix"></div>

<style>

</style>
