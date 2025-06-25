import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, BarChart3, Shield, Zap, CheckCircle, Link } from "lucide-react";
import Image from "next/image";

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track work hours in real-time with precise start and stop functionality"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics", 
      description: "Comprehensive reports and charts to analyze productivity patterns"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Perfect for small teams with collaborative time tracking features"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern tech stack for optimal performance"
    },
    {
      icon: CheckCircle,
      title: "Easy Setup",
      description: "Get started in minutes with our intuitive onboarding process"
    }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for freelancers and solo entrepreneurs",
      features: [
        "Up to 3 team members",
        "Basic time tracking",
        "Simple reports",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$19",
      period: "/month",
      description: "Ideal for growing small teams",
      features: [
        "Up to 15 team members",
        "Advanced analytics",
        "Custom reports",
        "Priority support",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$39",
      period: "/month",
      description: "For larger teams with advanced needs",
      features: [
        "Unlimited team members",
        "Advanced integrations",
        "Custom branding",
        "24/7 phone support",
        "SLA guarantee"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="WorkTimeTrack" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-[#442781] to-[#ff7916] bg-clip-text text-transparent">
              Work Time Tracker
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#442781] transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#442781] transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-[#442781] transition-colors">About</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-[#442781] hover:text-[#ff7916]">
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gradient-to-r from-[#ff7916]/10 to-[#442781]/10 text-[#442781] border-[#442781]/20">
            ✨ Employee Time Tracking Made Simple
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#442781] via-[#a992db] to-[#ff7916] bg-clip-text text-transparent leading-tight">
            Track Time,
            <br />
            Boost Productivity
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The modern time tracking solution designed for small teams. Get real-time insights, 
            detailed analytics, and seamless collaboration in one powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#ff7916] to-[#442781] hover:from-[#442781] hover:to-[#ff7916] text-white px-8 py-3 text-lg"
              asChild
            >
              <a href="/login">
                Start Free Trial
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-[#442781] text-[#442781] hover:bg-[#442781] hover:text-white px-8 py-3 text-lg" asChild>
              <a href="#demo">
                Watch Demo
              </a>
            </Button>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            ✓ No credit card required  ✓ 14-day free trial  ✓ Setup in 2 minutes
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#442781]/5 to-[#ff7916]/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#442781] mb-4">
              See WorkTimeTrack in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of modern time tracking with our intuitive dashboard
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff7916]/20 to-[#442781]/20 rounded-2xl blur-xl transform rotate-1"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#442781] to-[#ff7916] h-2"></div>
              <Image 
                src="/dashboard.png"
                alt="WorkTimeTrack Dashboard"
                className="w-full h-auto"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#442781] mb-4">
              Everything You Need to Track Time Effectively
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make time tracking effortless for you and your team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff7916] to-[#442781] flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#442781] mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#442781] to-[#ff7916]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl opacity-90">Hours Tracked</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Happy Teams</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-xl opacity-90">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#442781] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'transform scale-105 bg-gradient-to-br from-white to-[#442781]/5' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#ff7916] to-[#442781] text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#442781] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-[#442781]">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-[#ff7916] to-[#442781] hover:from-[#442781] hover:to-[#ff7916] text-white' : 'border-[#442781] text-[#442781] hover:bg-[#442781] hover:text-white'}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href="/login">Start Free Trial</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#442781] to-[#ff7916]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Time Tracking?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using WorkTimeTrack to boost productivity and streamline operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-[#442781] hover:bg-gray-100 px-8 py-3 text-lg"
              asChild
            >
              <a href="/login">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#442781] px-8 py-3 text-lg"
              asChild
            >
              <a href="#contact">
                Contact Sales
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#442781] text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff7916] to-white flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#442781]" />
                </div>
                <span className="text-xl font-bold">WorkTimeTrack</span>
              </div>
              <p className="text-gray-300 text-sm">
                The modern time tracking solution for small teams and growing businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2025 WorkTimeTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
