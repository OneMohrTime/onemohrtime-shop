# OneMohrTi.me/

[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fonemohrti.me)](https://validator.w3.org/)
[![GitHub issues](https://img.shields.io/github/issues/onemohrtime/onemohrtime-theme)](https://github.com/OneMohrTime/onemohrtime-theme/issues)
![Reddit User Karma](https://img.shields.io/reddit/user-karma/combined/onemohrtime?label=karma)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fonemohrtime)](https://twitter.com/intent/tweet?text=Check+out+these+interactions:&url=https%3A%2F%2Fgithub.com%2FOneMohrTime%2Fonemohrtime-theme)

## Description

This repo is the codebase for [https://onemohrti.me](https://onemohrti.me), written by [Derek Mohr](https://instagram.com/onemohrtimedesign). It's a WordPress theme that has been expanding/contracting since 2016, with a few major redesigns and many, many minor changes.

## Getting Started

### Dependencies

<table>
	<thead>
		<tr>
			<th colspan="4">Server</th>
			<th colspan="3">JS Libs</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>Node 12.x</code></td>
			<td><code>NPM 6.x</code></td>
			<td><code>PHP 7.4</code></td>
			<td><code>MySQL 5.7</code></td>
			<td><code>gsap@3</code></td>
			<td><code>Isotope v3</code></td>
			<td><code>jQuery 3</code></td>
		</tr>
	</tbody>
</table>

### Build Commands

This project uses **Laravel Mix** to compile most assets. Unfortunately, `Fancybox 3` doesn't compile as a module, among other issues in the [backlog](./issues).

```zsh
# compile expanded assets
npm run dev

# compile compressed assets
npm run prod

# watch and reload components
npm run watch
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
