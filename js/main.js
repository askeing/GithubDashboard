/**
 * Created by Askeing on 16/3/30.
 */

var config = new Object();
var repos = [];

$(document).ready(function() {
    $.getJSON( "config/config.json", function( data ) {
        $.each( data, function( key, val ) {
            config[key] = val;
        });

        // change Title
        $("head title").html(config["title"]);
        $("#config_title").html(config["title"]);
        // change description
        $("#config_description").html(config["description"]);
        // change the URL link
        $("#btn-learn-more").click( function() {
            window.open(config["url"], "githubURL");
        });

        // get repos information
        var all_languages = new Map();
        api_url = "https://api.github.com/users/" + config["username"] + "/repos?type=all&per_page=100&sort=updated&direction=desc";
        var container = $("#repos_list");
        $.ajax(api_url)
            .done( function(ret_json) {
                repos = ret_json;
                /*
                // Sort return json array, but we can use API for sorting.
                repos.sort(function(a, b) {
                    a = new Date(a.updated_at);
                    b = new Date(b.updated_at);
                    return a>b ? -1 : a<b ? 1 : 0;
                });
                */
                var row_div = document.createElement("div");
                row_div.className = "row";
                container.append(row_div);
                var container_row = container.children("div.row");

                var repo_template = '\
                <div class="col-md-4 repo-card lang-%REPO_LANG%"> \
                    <div class="panel panel-default"> \
                        <div class="panel-heading" repolink="%REPO_LINK%"> \
                            <h2 class="panel-title">%REPO_NAME%</h2><i class="fa fa-external-link"></i>\
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
                    var description = repo.description;
                    var stargazers = repo.stargazers_count;
                    var forks = repo.forks;
                    var language = repo.language;
                    var updated_at = repo.updated_at;
                    // Add language into all_languates list.
                    all_languages.set(language, true);
                    // Create repo card html.
                    var replace = {
                        "%REPO_NAME%": name,
                        "%REPO_DESC%": description || "No description provided.",
                        "%REPO_LANG%": language || "Other",
                        "%REPO_FORK%": forks || "0",
                        "%REPO_STAR%": stargazers || "0",
                        "%REPO_LINK%": html_url,
                        "%REPO_UPTATE%": updated_at
                    };
                    var repo_card_html = repo_template.replace(/%\w+%/g, function(placeholder) { return replace[placeholder] || placeholder; } );
                    container_row.append(repo_card_html);
                });
                // Add languages into Languages_Selection Button.
                for (var key of all_languages.keys())
                {
                    if (key != null) {
                        var id = "lang-" + key;
                        var li_html = "<li id=\"" + id + "\"><a href=\"#\">" + key + "</a></li>";
                        $("ul#btn-language-selection").append(li_html);
                    }
                }
                {
                    var key = "Other";
                    var id = "lang-" + key;
                    var li_html = "<li id=\"" + id + "\"><a href=\"#\">" + key + "</a></li>";
                    $("ul#btn-language-selection").append(li_html);
                }

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
                    console.log(select_lang);
                    if (select_lang === "lang-all") {
                        $("#repos_list .repo-card").show();
                        $("#btn-language-label").text(select_lang_text);
                    }
                    else {
                        $("#repos_list .repo-card").hide();
                        $("#repos_list .repo-card").filter("." + select_lang).show();
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
