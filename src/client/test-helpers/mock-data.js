/* jshint -W079, -W101 */
var mockData = (function () {
    return {
        getMockAuthResponse: getMockAuthResponse()[0],
        failureAuthResponse: failureAuthResponse(),
        logoutResponse: logoutResponse(),
        getMockVideo: getMockVideo,
        getMockVideos: getMockVideos,
        getMockStates: getMockStates,
        blackWindow: getMockVideos().data[0]
    };

    function getMockAuthResponse() {
        return [
            {
                status: 'success',
                sessionId: '5vO7y5m6nEnuiDJqVzNNdQfXVwpWCm7G',
                username: 'ali'
            },
            {
                status: 'success',
                sessionId: '5vO7y5m6nEnuiDJqVzNNdQfXVwpWCm7G',
                username: 'tom'
            },
            {
                status: 'success',
                sessionId: '5vO7y5m6nEnuiDJqVzNNdQfXVwpWCm7G',
                username: 'harry'
            }
        ];
    }

    function failureAuthResponse() {
        return {
            status: 'error',
            error: 'Invalid username or password'
        };
    }

    function logoutResponse() {
        return {
            status: 'success'
        };
    }

    function getMockStates() {
        return {
            data: [
                {
                    state: 'login',
                    config: {
                        url: '/',
                        templateUrl: 'app/blocks/auth/templates/login.html',
                        title: 'Login'
                    }
                }
            ]
        };
    }

    function getMockVideo() {
        return {
            data: {
                '_id': '575a04c765697bd0124763b6',
                'name': '[0] Getting Started With ReactJs',
                'description': 'React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.',
                'url': 'videos/Getting_Started_With_React.js.mp4',
                'ratings': [
                    1,
                    5,
                    5,
                    4,
                    3,
                    4,
                    2,
                    5
                ]
            }
        };
    }

    function getMockVideos() {
        return {
            data: [
                {
                    '_id': '575a04c765697bd0124763b6',
                    'name': '[0] Getting Started With ReactJs',
                    'description': 'React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.',
                    'url': 'videos/Getting_Started_With_React.js.mp4',
                    'ratings': [
                        1,
                        5,
                        5,
                        4,
                        3,
                        4,
                        2,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763b7',
                    'name': '[1] Google Cardboard Assembly',
                    'description': 'Google Cardboard Assembly Step by Step Instructions [HD]',
                    'url': 'videos/Google_Cardboard_Assembly.mp4',
                    'ratings': [
                        4,
                        5,
                        5,
                        5,
                        3,
                        5,
                        4,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763b8',
                    'name': '[2] How Does AngularJS Work Beginners Angular Tutorial',
                    'description': 'What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!',
                    'url': 'videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4',
                    'ratings': [
                        2,
                        4,
                        2,
                        2,
                        3,
                        1,
                        2,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763b9',
                    'name': '[3] How does Node.js work',
                    'description': 'New to Node.js? Check out this video that explains \'How does Node work?\'',
                    'url': 'videos/How_does_Node.js_work.mp4',
                    'ratings': [
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        3
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763ba',
                    'name': '[4] iPhone 7 Trailer 2016',
                    'description': 'iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!',
                    'url': 'videos/iPhone_7_Trailer_2016.mp4',
                    'ratings': [
                        4,
                        3,
                        4,
                        3,
                        4,
                        3,
                        4,
                        3
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763bb',
                    'name': '[5] What is the MEAN Stack',
                    'description': 'Do you know what the MEAN stack is? Watch our short intro video and get ready to kick your learning into shape with this full-stack development toolkit. Then head on over and play through our MEAN-related courses now.',
                    'url': 'videos/What_is_the_MEAN_Stack.mp4',
                    'ratings': [
                        1,
                        5,
                        5,
                        5,
                        3,
                        4,
                        5,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763bc',
                    'name': '[6] Getting Started With ReactJs',
                    'description': 'React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.',
                    'url': 'videos/Getting_Started_With_React.js.mp4',
                    'ratings': [
                        1,
                        5,
                        5,
                        4,
                        3,
                        4,
                        2,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763bd',
                    'name': '[7] Google Cardboard Assembly',
                    'description': 'Google Cardboard Assembly Step by Step Instructions [HD]',
                    'url': 'videos/Google_Cardboard_Assembly.mp4',
                    'ratings': [
                        4,
                        5,
                        5,
                        5,
                        3,
                        5,
                        4,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763be',
                    'name': '[8] How Does AngularJS Work Beginners Angular Tutorial',
                    'description': 'What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!',
                    'url': 'videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4',
                    'ratings': [
                        2,
                        4,
                        2,
                        2,
                        3,
                        1,
                        2,
                        5
                    ]
                },
                {
                    '_id': '575a04c765697bd0124763bf',
                    'name': '[9] How does Node.js work',
                    'description': 'New to Node.js? Check out this video that explains \'How does Node work?\'',
                    'url': 'videos/How_does_Node.js_work.mp4',
                    'ratings': [
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        3
                    ]
                }
            ]
        };
    }
})();
