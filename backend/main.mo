import Map "mo:core/Map";
import Iter "mo:core/Iter";

actor {
  type Testimonial = {
    clientName : Text;
    company : Text;
    feedback : Text;
    profileImageUrl : Text;
  };

  let testimonials = Map.empty<Text, Testimonial>();

  public shared ({ caller }) func addTestimonial(id : Text, clientName : Text, company : Text, feedback : Text, profileImageUrl : Text) : async () {
    let testimonial : Testimonial = {
      clientName;
      company;
      feedback;
      profileImageUrl;
    };
    testimonials.add(id, testimonial);
  };

  public query ({ caller }) func getTestimonial(id : Text) : async ?Testimonial {
    testimonials.get(id);
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };
};
