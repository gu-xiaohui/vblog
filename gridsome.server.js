// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const user = "gu-xiaohui";
const apis = {
  followers: `https://api.github.com/users/${user}/followers`,
  following: `https://api.github.com/users/${user}/following`,
  repos: `https://api.github.com/users/${user}/repos`,
};
const axios = require("axios");
module.exports = function(api) {
  api.loadSource(async ({ addCollection }) => {
    // 增加集合
    const followersCollection = addCollection("Followers");
    const followingCollection = addCollection("Following");
    const reposCollection = addCollection("Repos");
    try {
      const { data: followers } = await getFollowers();
      const { data: following } = await getFollowing();
      const { data: repos } = await getRepos();
      for (const follower of followers) {
        followersCollection.addNode({
          login: follower.login,
          id: follower.id,
          node_id: follower.node_id,
          avatar_url: follower.avatar_url,
          gravatar_id: follower.gravatar_id,
          url: follower.url,
          html_url: follower.html_url,
          followers_url: follower.followers_url,
          following_url: follower.following_url,
          gists_url: follower.gists_url,
          starred_url: follower.starred_url,
          subscriptions_url: follower.subscriptions_url,
          organizations_url: follower.organizations_url,
          repos_url: follower.repos_url,
          events_url: follower.events_url,
          received_events_url: follower.received_events_url,
          type: follower.type,
          site_admin: follower.site_admin,
        });
      }
      for (const follow of following) {
        followingCollection.addNode({
          login: follow.login,
          id: follow.id,
          node_id: follow.node_id,
          avatar_url: follow.avatar_url,
          gravatar_id: follow.gravatar_id,
          url: follow.url,
          html_url: follow.html_url,
          followers_url: follow.followers_url,
          following_url: follow.following_url,
          gists_url: follow.gists_url,
          starred_url: follow.starred_url,
          subscriptions_url: follow.subscriptions_url,
          organizations_url: follow.organizations_url,
          repos_url: follow.repos_url,
          events_url: follow.events_url,
          received_events_url: follow.received_events_url,
          type: follow.type,
          site_admin: follow.site_admin,
        });
      }
      handleRepos(reposCollection, repos);
    } catch (e) {
      throw e;
      console.log("ss", e);
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};

async function getFollowers() {
  return axios.get(apis.followers, { params: { page: 1, per_page: 1000 } });
}
async function getFollowing() {
  return axios.get(apis.following, { params: { page: 1, per_page: 1000 } });
}
async function getRepos() {
  return axios.get(apis.repos, { params: { page: 1, per_page: 1000 } });
}

function handleRepos(collection, data) {
  for (const repo of data) {
    repo.license = repo.license || {}
    collection.addNode({
      id: repo.id,
      node_id: repo.node_id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      owner: {
        login: repo.owner.login,
        id: repo.owner.id,
        node_id: repo.owner.node_id,
        avatar_url: repo.owner.avatar_url,
        gravatar_id: repo.owner.gravatar_id,
        url: repo.owner.url,
        html_url: repo.owner.html_url,
        followers_url: repo.owner.followers_url,
        following_url: repo.owner.following_url,
        gists_url: repo.owner.gists_url,
        starred_url: repo.owner.starred_url,
        subscriptions_url: repo.owner.subscriptions_url,
        organizations_url: repo.owner.organizations_url,
        repos_url: repo.owner.repos_url,
        events_url: repo.owner.events_url,
        received_events_url: repo.owner.received_events_url,
        type: repo.owner.type,
        site_admin: repo.owner.site_admin,
      },
      html_url: repo.html_url,
      description: repo.description,
      fork: repo.fork,
      url: repo.url,
      forks_url: repo.forks_url,
      keys_url: repo.keys_url,
      collaborators_url: repo.collaborators_url,
      teams_url: repo.teams_url,
      hooks_url: repo.hooks_url,
      issue_events_url: repo.issue_events_url,
      events_url: repo.events_url,
      assignees_url: repo.assignees_url,
      branches_url: repo.branches_url,
      tags_url: repo.tags_url,
      blobs_url: repo.blobs_url,
      git_tags_url: repo.git_tags_url,
      git_refs_url: repo.git_refs_url,
      trees_url: repo.trees_url,
      statuses_url: repo.statuses_url,
      languages_url: repo.languages_url,
      stargazers_url: repo.stargazers_url,
      contributors_url: repo.contributors_url,
      subscribers_url: repo.subscribers_url,
      subscription_url: repo.subscription_url,
      commits_url: repo.commits_url,
      git_commits_url: repo.git_commits_url,
      comments_url: repo.comments_url,
      issue_comment_url: repo.issue_comment_url,
      contents_url: repo.contents_url,
      compare_url: repo.compare_url,
      merges_url: repo.merges_url,
      archive_url: repo.archive_url,
      downloads_url: repo.downloads_url,
      issues_url: repo.issues_url,
      pulls_url: repo.pulls_url,
      milestones_url: repo.milestones_url,
      notifications_url: repo.notifications_url,
      labels_url: repo.labels_url,
      releases_url: repo.releases_url,
      deployments_url: repo.deployments_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      git_url: repo.git_url,
      ssh_url: repo.ssh_url,
      clone_url: repo.clone_url,
      svn_url: repo.svn_url,
      homepage: repo.homepage,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      has_issues: repo.has_issues,
      has_projects: repo.has_projects,
      has_downloads: repo.has_downloads,
      has_wiki: repo.has_wiki,
      has_pages: repo.has_pages,
      forks_count: repo.forks_count,
      mirror_url: repo.mirror_url,
      archived: repo.archived,
      disabled: repo.disabled,
      open_issues_count: repo.open_issues_count,
      license: {
        key: repo.license.key,
        name: repo.license.name,
        spdx_id: repo.license.spdx_id,
        url: repo.license.url,
        node_id: repo.license.node_id,
      },
      forks: repo.forks,
      open_issues: repo.open_issues,
      watchers: repo.watchers,
      default_branch: repo.default_branch,
    });
  }
}
