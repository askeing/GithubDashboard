"use strict";

var config = new Object();
var repos = [];

$(document).ready(function() {
    $.getJSON( "config/config.json", function( data ) {
        $.each( data, function( key, val ) {
            config[key] = val;
        });

        // Change the URL link
        $("#btn-learn-more").click( function() {
            window.open(config["url"], "githubURL");
        });

        // get repos information
        var all_languages = new Map();
        var api_url = "https://api.github.com/users/" + config["username"] + "/repos?type=all&per_page=100&sort=updated&direction=desc";
        var container = $("#repos_list");
        $.ajax(api_url)
            .done( function(ret_json) {
                repos = ret_json;
                var row_div = document.createElement("div");
                row_div.className = "row";
                container.html("");
                container.append(row_div);
                var container_row = container.children("div.row");

                var repo_template = ' \
                <div class="col-md-4 col-xs-6 repo-card lang-%REPO_LANG_ID%"> \
                    <div class="panel panel-default"> \
                        <div class="panel-heading" repolink="%REPO_LINK%"> \
                            <h2 class="text-primary panel-title">%REPO_NAME%<i class="fa fa-external-link"></i></h2> \
                        </div> \
                        <div class="panel-body"> \
                            %REPO_DESC% \
                        </div> \
                        <div class="panel-footer text-right text-muted" data-toggle="tooltip" data-placement="bottom" title="%REPO_UPTATE% Updated"> \
                            <span class="text-info"><span class="badge"><i class="fa fa-code"></i></span> %REPO_LANG%</span> \
                            <span class="text-info"><span class="badge"><i class="fa fa-code-fork"></i></span> %REPO_FORK%</span> \
                            <span class="text-info"><span class="badge"><i class="fa fa-star"></i></span> %REPO_STAR%</span> \
                        </div> \
                    </div> \
                </div>';

                $.each( repos, function (index, repo) {
                    var name = repo.name;
                    var html_url = repo.html_url;
                    var description = repo.description || "No description provided.";
                    var stargazers = repo.stargazers_count || "0";
                    var forks = repo.forks || "0";
                    var language = repo.language || "Other";
                    var updated_at = repo.updated_at;
                    // Add language into all_languates list.
                    var language_id = language.replace(/[\s]+/gi, "")
                        .replace(/[\+]/gi, "plus")
                        .replace(/[#]/gi, "sharp")
                        .replace(/[']/gi, "apostrophe");
                    all_languages.set(language, language_id);
                    // Create repo card html.
                    var replace = {
                        "%REPO_NAME%": name,
                        "%REPO_DESC%": description,
                        "%REPO_LANG%": language,
                        "%REPO_LANG_ID%": language_id,
                        "%REPO_FORK%": forks,
                        "%REPO_STAR%": stargazers,
                        "%REPO_LINK%": html_url,
                        "%REPO_UPTATE%": updated_at
                    };
                    var repo_card_html = repo_template.replace(/%\w+%/g, function(placeholder) { return replace[placeholder] || placeholder; } );
                    container_row.append(repo_card_html);
                });

                function addLanguageButtons(lang_id, lang_key, all_languages) {
                    if (lang_key != null) {
                        var id = "lang-" + lang_id;
                        var li_html = "<li id=\"" + id + "\"><a href=\"#\">" + lang_key + "</a></li>";
                        $("ul#btn-language-selection").append(li_html);
                    }
                }
                all_languages.forEach(addLanguageButtons);

                // Listen on repo card click
                $("#repos_list div.row div[repolink]").click(function() {
                    var repo_link = $(this).attr("repolink");
                    window.open(repo_link, "githubURL");
                });

                // listen on language selection buttons
                $("ul#btn-language-selection li").click(function () {
                    // TODO: implement the filter of repos cards
                    var select_lang = this.id;
                    var select_lang_text = $(this).text();
                    if (select_lang === "lang-all") {
                        $("#repos_list .repo-card").show();
                        $("#btn-language-label").text(select_lang_text);
                    }
                    else {
                        $("#repos_list .repo-card").hide();
                        $("#repos_list .repo-card." + select_lang).show();
                        $("#btn-language-label").text(select_lang_text);
                    }
                });
            })
            .fail( function(ret_json) {
                // TODO: un-testing
                var error_msg = ret_json.message;
                var error_div = document.createElement("div");
                error_div.className = "alert alert-danger";
                error_div.setAttribute("role", "alert");
                error_div.textContent = error_msg;
                container.html(error_div);
            });
    });
});
