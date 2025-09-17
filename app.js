// AngularJS Portfolio Application
angular.module('portfolioApp', ['ngAnimate'])
    .controller('MainController', function($scope, $timeout, $http, PortfolioService) {
        
        // Initialize scope variables
        $scope.isScrolled = false;
        $scope.mobileMenuOpen = false;
        $scope.heroAnimated = false;
        $scope.formSubmitting = false;
        $scope.formData = {
            name: '',
            email: '',
            message: ''
        };

        // Typewriter animation roles
        $scope.roles = [
            "a Web Developer",
            "an Application Developer", 
            "an Ethical Hacker",
            "a Full Stack Developer",
            "a UI/UX Designer",
            "a Cloud Engineer"
        ];
        $scope.currentRoleIndex = 0;
        $scope.currentText = '';
        $scope.isDeleting = false;

        // Services data
        $scope.services = [
            {
                title: 'Web Development',
                description: 'Custom web applications built with modern technologies',
                icon: 'fas fa-code',
                features: ['React/Angular', 'Node.js', 'MongoDB', 'RESTful APIs'],
                hovered: false
            },
            {
                title: 'UI/UX Design',
                description: 'Beautiful and intuitive user interfaces',
                icon: 'fas fa-palette',
                features: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
                hovered: false
            },
            {
                title: 'Mobile Apps',
                description: 'Cross-platform mobile applications',
                icon: 'fas fa-mobile-alt',
                features: ['React Native', 'Flutter', 'iOS/Android', 'App Store'],
                hovered: false
            },
            {
                title: 'Cloud Solutions',
                description: 'Scalable cloud infrastructure and deployment',
                icon: 'fas fa-cloud',
                features: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
                hovered: false
            }
        ];

        // Experience data
        $scope.experience = [
            {
                position: 'Senior Full Stack Developer',
                company: 'TechCorp Inc.',
                duration: '2022 - Present',
                description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
                skills: ['React', 'Node.js', 'AWS', 'MongoDB', 'Docker'],
                visible: true
            },
            {
                position: 'Full Stack Developer',
                company: 'StartupXYZ',
                duration: '2020 - 2022',
                description: 'Developed and maintained multiple web applications from concept to deployment. Collaborated with design team to create responsive user interfaces.',
                skills: ['Angular', 'Express.js', 'PostgreSQL', 'Redis', 'Git'],
                visible: true
            },
            {
                position: 'Frontend Developer',
                company: 'WebSolutions Ltd.',
                duration: '2019 - 2020',
                description: 'Focused on creating responsive and interactive user interfaces using modern JavaScript frameworks and CSS preprocessors.',
                skills: ['JavaScript', 'Vue.js', 'SASS', 'Webpack', 'Jest'],
                visible: true
            }
        ];

        // Projects data
        $scope.projects = [
            {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Features include user authentication, payment processing, and admin dashboard.',
                image: 'https://via.placeholder.com/400x250/1a1a1a/00d4ff?text=E-Commerce+Platform',
                liveUrl: 'https://your-ecommerce-demo.com',
                githubUrl: 'https://github.com/yourusername/ecommerce-platform',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
                hovered: false
            },
            {
                title: 'Intrusion Detection System',
                description: 'A network-based Intrusion Detection System (IDS) that captures and analyzes suspicious packets and scanning attempts from unknown sources in real time, while generating detailed security logs for threat analysis.',
                image: 'https://as2.ftcdn.net/v2/jpg/16/35/69/03/1000_F_1635690399_5dMIIlJOAohEfLUsBcGzCOdngvX9QTi0.jpg',
                liveUrl: null,
                githubUrl: 'https://github.com/nakul-soni/Intrusion-Detection-System',
                technologies: ['Cyber Security', 'Computer Networks', 'Kali Linux', 'Wireshark', 'Python'],
                hovered: false
            },
            {
                title: 'PackPal-A Group Logistics Planner',
                description: 'A responsive and collaborative group logistics planner that streamlines trip preparation with shared checklists, categorized items, and real-time management for seamless travel organization.',
                image: './Images/PackPal Thumbnail.jpg',
                liveUrl: 'https://nakul-soni.github.io/PackPal-Groups-Logistics-Planner-/',
                githubUrl: 'https://github.com/nakul-soni/PackPal-Groups-Logistics-Planner-',
                technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'BootStrap'],
                hovered: false
            },
            {
                title: 'Social Media Analytics',
                description: 'A comprehensive analytics platform for social media metrics with data visualization, reporting, and trend analysis capabilities.',
                image: 'https://via.placeholder.com/400x250/1a1a1a/ff6b6b?text=Social+Analytics',
                liveUrl: 'https://your-analytics-demo.com',
                githubUrl: 'https://github.com/yourusername/social-analytics',
                technologies: ['React', 'D3.js', 'Python', 'Django', 'AWS'],
                hovered: false
            },
            {
                title: 'Portfolio Website',
                description: 'This modern portfolio website built with AngularJS, featuring 3D animations, responsive design, and interactive elements.',
                image: 'https://via.placeholder.com/400x250/1a1a1a/9c88ff?text=Portfolio+Website',
                liveUrl: 'https://your-portfolio.com',
                githubUrl: 'https://github.com/yourusername/portfolio',
                technologies: ['AngularJS', 'Three.js', 'GSAP', 'Node.js', 'Express'],
                hovered: false
            },
            {
                title: 'Mobile Banking App',
                description: 'A secure mobile banking application with biometric authentication, transaction management, and real-time notifications.',
                image: 'https://via.placeholder.com/400x250/1a1a1a/ffd93d?text=Banking+App',
                liveUrl: null,
                githubUrl: 'https://github.com/yourusername/banking-app',
                technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Biometric Auth'],
                hovered: false
            }
        ];

        // Skills data
        $scope.skills = [
            {
                name: 'Frontend',
                items: ['React', 'Angular', 'Vue.js', 'TypeScript', 'HTML5', 'CSS3', 'SASS']
            },
            {
                name: 'Backend',
                items: ['Node.js', 'Express.js', 'Python', 'Django', 'PHP', 'Laravel']
            },
            {
                name: 'Database',
                items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
            },
            {
                name: 'Tools & Others',
                items: ['Git', 'Docker', 'AWS', 'Figma', 'Webpack', 'Jest']
            }
        ];

        // Typewriter animation function
        $scope.typeWriter = function() {
            const currentRole = $scope.roles[$scope.currentRoleIndex];
            const speed = $scope.isDeleting ? 50 : 100; // Faster when deleting

            if ($scope.isDeleting) {
                $scope.currentText = currentRole.substring(0, $scope.currentText.length - 1);
            } else {
                $scope.currentText = currentRole.substring(0, $scope.currentText.length + 1);
            }

            if (!$scope.isDeleting && $scope.currentText === currentRole) {
                // Finished typing, wait before starting to delete
                $timeout(function() {
                    $scope.isDeleting = true;
                    $scope.typeWriter();
                }, 2000);
            } else if ($scope.isDeleting && $scope.currentText === '') {
                // Finished deleting, move to next role
                $scope.isDeleting = false;
                $scope.currentRoleIndex = ($scope.currentRoleIndex + 1) % $scope.roles.length;
                $timeout(function() {
                    $scope.typeWriter();
                }, 500);
            } else {
                // Continue typing or deleting
                $timeout(function() {
                    $scope.typeWriter();
                }, speed);
            }
        };

        // Initialize animations
        $scope.initAnimations = function() {
            $timeout(function() {
                $scope.heroAnimated = true;
                // Start typewriter animation after hero animation
                $timeout(function() {
                    $scope.typeWriter();
                }, 1000);
            }, 500);

            // Initialize scroll animations
            $scope.initScrollAnimations();
        };

        // Scroll animations
        $scope.initScrollAnimations = function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('timeline-item')) {
                            $scope.$apply(function() {
                                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                                $scope.experience[index].visible = true;
                            });
                        }
                    }
                });
            }, observerOptions);

            // Observe timeline items
            $timeout(function() {
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(function(item) {
                    observer.observe(item);
                });
            }, 1000);
        };

        // Scroll handling
        $scope.handleScroll = function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            $scope.isScrolled = scrollTop > 100;
        };

        // Smooth scroll to section
        $scope.scrollToSection = function(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            $scope.mobileMenuOpen = false;
        };

        // Toggle mobile menu
        $scope.toggleMobileMenu = function() {
            $scope.mobileMenuOpen = !$scope.mobileMenuOpen;
        };

        // Contact form submission
        $scope.submitForm = function() {
            if ($scope.contactForm.$valid) {
                $scope.formSubmitting = true;
                
                PortfolioService.submitContactForm($scope.formData)
                    .then(function(response) {
                        // Success
                        $scope.showNotification('Message sent successfully!', 'success');
                        $scope.formData = { name: '', email: '', message: '' };
                        $scope.contactForm.$setPristine();
                    })
                    .catch(function(error) {
                        // Error
                        $scope.showNotification('Failed to send message. Please try again.', 'error');
                        console.error('Contact form error:', error);
                    })
                    .finally(function() {
                        $scope.formSubmitting = false;
                    });
            }
        };

        // Show notification
        $scope.showNotification = function(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#00d4ff' : '#ff4444'};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            $timeout(function() {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 3 seconds
            $timeout(function() {
                notification.style.transform = 'translateX(400px)';
                $timeout(function() {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        };

        // Initialize on load
        $scope.initAnimations();

        // Add scroll event listener
        angular.element(window).on('scroll', $scope.handleScroll);
    })

    .service('PortfolioService', function($http, $q) {
        return {
            submitContactForm: function(formData) {
                return $http.post('/api/contact', formData)
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(function(error) {
                        throw error;
                    });
            }
        };
    })

    .directive('scrollAnimation', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, {
                    threshold: 0.1
                });
                
                observer.observe(element[0]);
            }
        };
    });
