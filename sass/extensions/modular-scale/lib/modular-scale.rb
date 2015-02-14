# All gems that are required for this extension to work should go here.
# These are the requires you would normally put in your config.rb file
# By default, you should always included Compass. Do not include your
#  extension.
require 'compass'

# This tells Compass what your Compass extension is called, and where to find
#  its files
extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
Compass::Frameworks.register('modular-scale', :path => extension_path)

# Version and date of version for your Compass extension.
# Replace ModularScale with the name of your extension
#  Letters, numbers, and underscores only
#  Version is a number. If a version contains alphas, it will be created as
#    a prerelease version
#  Date is in the form of YYYY-MM-DD
module ModularScale
  VERSION = "2.0.5"
  DATE = "2013-12-20"
end

# This is where any custom SassScript should be placed. The functions will be
#  available on require of your extension without the need for users to import
#  any partials. Uncomment below.

module Sass::Script::Functions

  # Let MS know that extra functionality is avalible
  def ms_gem_installed()
    Sass::Script::Bool.new(true)
  end

  def ms_gem_func(value, bases, ratios)

    # Convert to native ruby things
    rvalue  = value.value.to_i

    if bases.class == Sass::Script::Number
      bases  = [] << bases
    else
      bases  = bases.value.to_a
    end
    if ratios.class == Sass::Script::Number
      ratios = [] << ratios
    else
      ratios = ratios.value.to_a
    end

    # Convert items in arrays to floating point numbers
    rbases  = []
    rratios = []
    bases.each do |num|
      rbases << num.value.to_f
    end
    ratios.each do |num|
      rratios << num.value.to_f
    end


    # Blank array for return
    r = [rbases[0]]

    # loop through all possibilities
    # NOTE THIS IS NOT FULLY FUNCTIONAL YET
    # ONLY LOOPS THROUGH SOME/MOST OF THE POSSIBILITES

    rratios.each do |ratio|
      rbases.each do |base|

        base_counter = 0

        # Seed list with an initial value
        r << base

        # Find values on a positive scale
        if rvalue >= 0
          # Find higher values on the scale
          i = 0;
          while ((ratio ** i) * base) >= (rbases[0])
            r << (ratio ** i) * base
            i = i - 1;
          end

          # Find lower possible values on the scale
          i = 0;
          while ((ratio ** i) * base) <= ((ratio ** (rvalue + 1)) * base)
            r << (ratio ** i) * base
            i = i + 1;
          end

        else

          # Find lower values on the scale
          i = 0;
          while ((ratio ** i) * base) <= (rbases[0])
            r << (ratio ** i) * base
            i = i + 1;
          end

          # Find higher possible values on the scale
          i = 0;
          while ((ratio ** i) * base) >= ((ratio ** (rvalue - 1)) * base)
            r << (ratio ** i) * base
            i = i - 1;
          end
        end

      end
    end

    # Sort and trim
    r.sort!
    r.uniq!


    if rvalue < 0
      r = r.keep_if { |a| a <= rbases[0] }
      # Final value
      r = r[(rvalue - 1)]
    else
      r = r[rvalue]
    end


    Sass::Script::Number.new(r)
  end
end